import { findUserById } from "../repositories/user-repositories.js";

export async function profileService(id, idFromToken) {
    try {
        if (id !== idFromToken) {
            throw new Error("Forbidden");
        }
        const user = await findUserById(id);
        return user;
    } catch (error) {
        throw error;
    }
}