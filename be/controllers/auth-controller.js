import { loginService } from "../services/auth-service.js";
export async function login(req, res) {
    try {
        const { username, email } = req.body
        const result = await loginService(username, email)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
