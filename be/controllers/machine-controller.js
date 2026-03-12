export async function addMachine(req, res, next) {
    try {
        const { name, type } = req.body;
    
    } catch (error) {
        next(error);
    }   
}