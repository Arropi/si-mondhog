import { csvExportMachineMetrics } from "../services/csv-service.js"
import { pipeline } from "stream"

export async function downloadCSV(req, res, next) {
    try {
        const { machineId } = req.params
        const { id } = req.user
        const csvStream = await csvExportMachineMetrics(machineId, id)
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename="${machineId}_metrics.csv"`)
        pipeline(csvStream, res, (err) => {
            if(err){
                const error = new Error("Failed to download")
                error.statusCode = 500
                throw error
            }
        })
    } catch (error) {
        next(error)
    }
}