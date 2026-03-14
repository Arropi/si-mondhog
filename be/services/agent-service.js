import { createHash, timingSafeEqual, randomBytes } from "crypto"
import { getMachineByActivationToken, updateMachine } from "../repositories/machine-repositories.js"
import { addNewData } from "../repositories/machine-metrics-repositories.js"

export async function bootstrapService(id, specs){
    try {
        const { cpu_cores, total_ram_gb, total_disk_gb } = specs
        const apiKey = randomBytes(32).toString("hex")
        const hashApiKey = createHash("sha256").update(apiKey).digest("hex")
        const updatedData = updateMachine(id, { 
            hashApiKey: hashApiKey,
            cpuCores: Number(cpu_cores),
            totalRam: Number(total_ram_gb),
            totalDisk: Number(total_disk_gb),
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
            cpuUsage: Number(cpu_percent),
            ramUsage: Number(ram_percent),
            diskUsage: Number(disk_percent)
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