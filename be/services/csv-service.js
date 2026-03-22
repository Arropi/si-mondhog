import { format } from "fast-csv"
import { getLogsMetricsByMachineId } from "../repositories/machine-metrics-repositories.js";
export async function csvExportMachineMetrics(machineId) {
    try {
        const csvStream = format({ headers: true });
        csvStream.on('error', error => {
            console.error('Error writing CSV:', error);
            const err = new Error('Error generating CSV')
            err.statusCode = 500
            throw err
        })
        const metrics = await getLogsMetricsByMachineId(machineId)
        metrics.forEach(metric => csvStream.write(metric))        
        return csvStream
    } catch (error) {
        throw error
    }
}