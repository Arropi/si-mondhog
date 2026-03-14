export default function roleMiddleware(req, res, next) {
    try {
        const { role } = req.user
        if (role !== "admin") {
            const error = new Error("Forbidden, you dont have access");
            error.statusCode = 403;
            throw error;
        }
        next()
    } catch (error) {
        next(error)
    }
}