import { format } from "fast-csv"
import { getLogsMetricsByMachineId } from "../repositories/machine-metrics-repositories.js";
import { addLogsCsv } from "../repositories/log-csv-repositories.js";
export async function csvExportMachineMetrics(machineId, userId) {
    try {
        const csvStream = format({ headers: true });
        
        const metrics = await getLogsMetricsByMachineId(machineId)
        process.nextTick(async()=>{
            for (const metric of metrics) {
                csvStream.write(metric)
            }
            csvStream.end()
            await addLogsCsv(machineId, userId)
        })
        return csvStream
    } catch (error) {
        throw error
    }
}