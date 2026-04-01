import { findUserByEmail, findUserById, searchUserFromEmail, userToAdmin } from "../repositories/user-repositories.js";

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

export async function addAdminService(email) {
    try {
        const user = await findUserByEmail(email)
        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }

        if (user.role === "admin") {
            const error = new Error("User is already admin")
            error.statusCode = 400
            throw error
        }

        const updatedUser = await userToAdmin(email)
        return updatedUser
    } catch (error) {
        throw error
    }
}