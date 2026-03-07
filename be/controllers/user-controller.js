import { profileService } from "../services/user-service.js"

export async function userController(req, res) {
    try {
        const { id } = req.user
        const { id : idParam } = req.params
        const user = await profileService(idParam, id)
        res.status(200).json({
            "message": "User profile retrieved successfully",
            "user": user
        })
    } catch (error) {
        console.error(error)
        if (error.message === "Forbidden") {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }
        throw error
    }
}