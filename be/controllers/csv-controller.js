import { csvExportMachineMetrics } from "../services/csv-service.js"

export async function downloadCSV(req, res, next) {
    try {
        const { machineId } = req.params
        const csvStream = await csvExportMachineMetrics(machineId)
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename="${machineId}_metrics.csv"`)
        csvStream.pipe(res)
    } catch (error) {
        next(error)
    }
}