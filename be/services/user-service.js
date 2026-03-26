import { findUserByEmail, findUserById, searchUserFromEmail } from "../repositories/user-repositories.js";

export async function profileService(id, idFromToken) {
    try {
        if (id !== idFromToken) {
            const error = new Error("Forbidden: You don't have permission to access this resource");
            error.statusCode = 403;
            throw error;
        }
        
        const user = await findUserById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

export async function searchUserService(email) {
    try {
        const user = await searchUserFromEmail(email);
        return user;
    } catch (error) {
        throw error;
    }
}