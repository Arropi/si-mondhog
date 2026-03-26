import { loginService } from "../services/auth-service.js";
export async function login(req, res, next) {
    try {
        if (!req.body) {
            const error = new Error("Bad Request: No data provided");
            error.statusCode = 400;
            throw error;
        }
        const { username, email } = req.body
        const {status, ...result} = await loginService(username, email)
        res.status(status).json({
            "message": status === 201 ? "User created successfully" : "Login successfully",
            ...result
        })
    } catch (error) {
        next(error)
    }
}