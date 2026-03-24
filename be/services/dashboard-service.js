import { getSummaryMetrics } from "../repositories/machine-metrics-repositories.js";
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
        const [summary, maxSpecification] = await Promise.allSettled([
            getSummaryMetrics(lowBound, highBound),
            getMaxSpecificationMachine()
        ])
         const sumVal = summary.status === "fulfilled" ? summary.value : {}
        const machine = maxSpecification.status === "fulfilled" ? maxSpecification.value : {}
        return {
            metrics: sumVal.metrics,
            peak: {
                ...sumVal.peakMetrics[0] || {},
                ...machine.highestSpecification[0] || {}
            },
            stats: machine.statusMachine[0] || null,
            total: machine.totalMachine[0] || null
        }
    } catch (error) {
        throw error;
    }
}