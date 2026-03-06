import { findUserById } from "../repositories/user-repositories.js";
import {randomBytes, createHash} from "crypto"

export async function profileService(id, idFromToken) {
    try {
        if (id !== idFromToken) {
            throw new Error("Forbidden");
        }
        const token = randomBytes(3).toString("hex")
        console.log("Generated token:", token);
        const hashedToken = createHash("sha256").update(token).digest("hex")
        console.log("Hashed token:", hashedToken)
        const user = await findUserById(id);
        return user;
    } catch (error) {
        throw error;
    }
}