export default function roleMiddleware(req, res, next) {
    try {
        const { role } = req.user
        if (role !== "admin") {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            "message": "Authorize failed"
        })
    }
}