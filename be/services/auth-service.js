import jwt from "jsonwebtoken"
import { createUser, findUserByEmail } from "../repositories/user-repositories.js";

export async function loginService(username, email) {
    try {
        const user = await findUserByEmail(email)
        if (!user) {
            const newUser = await createUser(username, email)
            const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }) 
            return { user: newUser, token, status: 201}
        } else {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }) 
            return { user, token, status: 200}
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}