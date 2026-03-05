export async function userController( req, res) {
    try {
        const { id } = req.user
        console.log(id)
    } catch (error) {
        console.error(error)
        throw error
    }
}