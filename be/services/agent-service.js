import { createHash, timingSafeEqual, randomBytes, createCipheriv, createDecipheriv } from "crypto"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { getMachineByActivationToken, updateMachine } from "../repositories/machine-repositories.js"
import { addNewData } from "../repositories/machine-metrics-repositories.js"
import { PORT, R2_ACCESS_KEY_ID, R2_BUCKET_NAME, R2_ACCOUNT_ID, R2_SECRET_ACCESS_KEY, R2_SIGNED_URL_EXPIRES } from "../config/env.js"

const DOWNLOAD_TOKEN_TTL_MS = 1000 * 60 * 60 * 24
const DOWNLOAD_TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || "fallback-download-secret"
const AGENT_DOWNLOAD_BASE_URL = process.env.AGENT_DOWNLOAD_BASE_URL || `http://localhost:${PORT}`
const DOWNLOAD_ALGORITHM = "aes-256-gcm"
const DOWNLOAD_KEY = createHash("sha256").update(DOWNLOAD_TOKEN_SECRET).digest()
const R2_SIGNED_URL_TTL_SECONDS = Number(R2_SIGNED_URL_EXPIRES || 300)

const r2Client = new S3Client({
    region: "auto",
    endpoint: R2_ACCOUNT_ID ? `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : undefined,
    credentials: R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY ? {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    } : undefined,
})

function getAgentBinaryByOs(os) {
    switch (os) {
        case "Windows":
            return { filename: "agent-windows.exe", key: "agent-windows.exe" }
        case "Linux":
            return { filename: "agent-linux", key: "agent-linux" }
        case "macOS":
            return { filename: "agent-macos", key: "agent-macos" }
        default:
            return null
    }
}

export function createAgentDownloadToken(os) {
    const binary = getAgentBinaryByOs(os)
    if (!binary) {
        const error = new Error("Unsupported operating system")
        error.statusCode = 400
        throw error
    }

    const payload = {
        os,
        exp: Date.now() + DOWNLOAD_TOKEN_TTL_MS,
    }

    const iv = randomBytes(12)
    const cipher = createCipheriv(DOWNLOAD_ALGORITHM, DOWNLOAD_KEY, iv)
    const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(payload), "utf8"),
        cipher.final(),
    ])
    const authTag = cipher.getAuthTag()

    return `${iv.toString("base64url")}.${encrypted.toString("base64url")}.${authTag.toString("base64url")}`
}

export function buildAgentDownloadUrl(os) {
    const token = createAgentDownloadToken(os)
    return `${AGENT_DOWNLOAD_BASE_URL}/api/agent/download/${token}`
}

export function getAgentDownloadSource(token) {
    if (!token || typeof token !== "string") {
        const error = new Error("Invalid download token")
        error.statusCode = 400
        throw error
    }

    const tokenParts = token.split(".")
    if (tokenParts.length !== 3) {
        const error = new Error("Invalid download token")
        error.statusCode = 400
        throw error
    }

    let payload
    try {
        const [ivB64, encryptedB64, authTagB64] = tokenParts
        const iv = Buffer.from(ivB64, "base64url")
        const encrypted = Buffer.from(encryptedB64, "base64url")
        const authTag = Buffer.from(authTagB64, "base64url")

        const decipher = createDecipheriv(DOWNLOAD_ALGORITHM, DOWNLOAD_KEY, iv)
        decipher.setAuthTag(authTag)
        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final(),
        ])

        payload = JSON.parse(decrypted.toString("utf8"))
    } catch {
        const error = new Error("Invalid download token payload")
        error.statusCode = 403
        throw error
    }

    if (!payload.exp || Date.now() > Number(payload.exp)) {
        const error = new Error("Download token expired")
        error.statusCode = 403
        throw error
    }

    const binary = getAgentBinaryByOs(payload.os)
    if (!binary) {
        const error = new Error("Unsupported operating system")
        error.statusCode = 400
        throw error
    }

    return { os: payload.os, ...binary }
}

export async function createR2AgentDownloadUrl(os) {
    if (!R2_BUCKET_NAME) {
        const error = new Error("R2 bucket name is not configured")
        error.statusCode = 500
        throw error
    }

    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
        const error = new Error("R2 credentials are not configured")
        error.statusCode = 500
        throw error
    }

    const binary = getAgentBinaryByOs(os)
    if (!binary) {
        const error = new Error("Unsupported operating system")
        error.statusCode = 400
        throw error
    }

    const command = new GetObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: binary.key,
    })

    return getSignedUrl(r2Client, command, {
        expiresIn: R2_SIGNED_URL_TTL_SECONDS,
    })
}

export async function bootstrapService(id, specs){
    try {
        const { cpu_cores, total_ram_gb, total_disk_gb } = specs
        const apiKey = randomBytes(32).toString("hex")
        const hashApiKey = createHash("sha256").update(apiKey).digest("hex")
        const updatedData = updateMachine(id, { 
            hashApiKey: hashApiKey,
            cpuCores: Number(cpu_cores),
            totalRam: Number(total_ram_gb).toFixed(2),
            totalDisk: Number(total_disk_gb).toFixed(2),
            activationToken: null,
         })
        return { apiKey, updatedData }
    } catch (error) {
        throw error;
    }
}

export async function validateActivation(activationToken) {
    try {
        const hashToken = createHash("sha256").update(activationToken).digest("hex")
        const token = await getMachineByActivationToken(hashToken)
        if (!token) {
            const error = new Error("Resource not found");
            error.statusCode = 404
            throw error
        }
        return { 
            isValid: timingSafeEqual(Buffer.from(token.activationToken), Buffer.from(hashToken)),
            id: token._id
        }
    } catch (error) {
        throw error;
    }
}

export async function metricsService(dataMetrics, machineId) {
    try {
        const { cpu_percent, ram_percent, disk_percent} = dataMetrics
        const newMetrics = await addNewData({
            machineId: machineId,
            cpuUsage: Number(cpu_percent).toFixed(2),
            ramUsage: Number(ram_percent).toFixed(2),
            diskUsage: Number(disk_percent).toFixed(2)
        });
        return newMetrics;
    } catch (error) {
        throw error;
    }
}

export async function heartbeatService(machineId) {
    try {
        const updatedData = await updateMachine(machineId, { lastSeen: new Date() })
        return updatedData
    } catch (error) {
        throw error
    }
}