import { addAdminService, profileService, searchUserService } from "../services/user-service.js"

export async function userController(req, res, next) {
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
        next(error)
    }
}

export async function userSearchController(req, res, next) {
    try {
        const { search = ""} = req.query
        const user = await searchUserService(search)
        res.status(200).json({
            "message": "User search retrieved successfully",
            "user": user
        })
    } catch (error) {
        next(error)
    }
}

export async function addAdmin(req, res, next){
    try {
        const { email } = req.body
        const updatedUser = await addAdminService(email)

        res.status(200).json({
            "message": "Admin added successfully",
            "user": updatedUser
        })
    } catch (error) {
        next(error)
    }
}