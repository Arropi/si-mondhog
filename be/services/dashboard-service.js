import { getLogsEvent } from "../repositories/logs-event-repositories.js";
import { getLogsMetrics, getSummaryMetrics } from "../repositories/machine-metrics-repositories.js";
import { getMaxSpecificationMachine } from "../repositories/machine-repositories.js";
import { getDayDate, getTimeWeeksAgo } from "../utils/helper.js";

export async function getSummaryDashboardService(date){
    try {
        let {lowBound, highBound} = getDayDate(date)
        if(!date) {
            const {oneWeekAgo, thisNightDay} = getTimeWeeksAgo()
            lowBound = oneWeekAgo
            highBound = thisNightDay
        }
        const [summary, maxSpecification, metrics, event] = await Promise.allSettled([
            getSummaryMetrics(lowBound, highBound),
            getMaxSpecificationMachine(),
            getLogsMetrics(lowBound, highBound, 10),
            getLogsEvent(lowBound, highBound, 10)
        ])
        const sumVal = summary.status === "fulfilled" ? summary.value : {}
        const machine = maxSpecification.status === "fulfilled" ? maxSpecification.value : {}
        const logMetrics = metrics.status === "fulfilled" ? metrics.value : {}
        const logEvent = event.status === "fulfilled" ? event.value : {}
        return {
            metrics: sumVal.metrics,
            peak: {
                ...sumVal.peakMetrics[0] || {},
                ...machine.highestSpecification[0] || {}
            },
            stats: machine.statusMachine[0] || null,
            total: machine.totalMachine[0] || null,
            logs: {
                performance: logMetrics,
                events: logEvent
            }
        }
    } catch (error) {
        throw error;
    }
}