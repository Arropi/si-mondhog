import { csvExportEvents, csvExportMachineMetrics, csvExportPerformance } from "../services/csv-service.js"
import { pipeline } from "stream"

export async function downloadCSVDetail(req, res, next) {
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

export async function downloadCSVPerformance(req, res, next) {
    try {
        const { date } = req.query
        const csvStream = await csvExportPerformance(date)
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename="performance_logs.csv"`)
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

export async function downloadCSVEvent(req, res, next) {
    try {
        const { date } = req.query
        const csvStream = await csvExportEvents(date)
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename="events_logs.csv"`)
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