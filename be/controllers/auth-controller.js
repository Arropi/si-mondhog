import { loginService } from "../services/auth-service.js";
export async function login(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Bad Request" })
        }
        const { username, email } = req.body
        const {status, ...result} = await loginService(username, email)
        res.status(status).json({
            "message": status === 201 ? "User created successfully" : "Login successfully",
            ...result
        })
    } catch (error) {
        // console.log(error.name)
        // console.error(error)
        // res.status(500).json({ message: "Internal Server Error" })
        next(error)
    }
}