import { format } from "fast-csv";
import { getLogsMetrics, getLogsMetricsByMachineId } from "../repositories/machine-metrics-repositories.js";
import { addLogsEvent, getLogsEvent } from "../repositories/logs-event-repositories.js";
import { getDayDate, getTimeWeeksAgo } from "../utils/helper.js";
export async function csvExportMachineMetrics(machineId, userId) {
  try {
    const csvStream = format({ headers: true });

    const metrics = await getLogsMetricsByMachineId(machineId);
    process.nextTick(async () => {
      let { hostname, os } = metrics[0];
      for (const metric of metrics) {
        csvStream.write(metric);
      }
      csvStream.end();
      console.log(hostname, os)
      await addLogsEvent(machineId, userId, "Exported", os, hostname);
    });
    return csvStream;
  } catch (error) {
    throw error;
  }
}

export async function csvExportPerformance(date) {
  try {
    const csvStream = format({ headers: true });
    let { lowBound, highBound } = getDayDate(date);
    if (!date) {
      const { oneWeekAgo, thisNightDay } = getTimeWeeksAgo();
      lowBound = oneWeekAgo;
      highBound = thisNightDay;
    }
    console.log(lowBound, highBound)
    const data = await getLogsMetrics(lowBound, highBound)
    process.nextTick(async () => {
      for (const performance of data) {
        csvStream.write(performance);
      }
      csvStream.end();
    });
    return csvStream;
  } catch (error) {
    throw error;
  }
}

export async function csvExportEvents(date) {
  try {
    const csvStream = format({ headers: true });
    let { lowBound, highBound } = getDayDate(date);
    if (!date) {
      const { oneWeekAgo, thisNightDay } = getTimeWeeksAgo();
      lowBound = oneWeekAgo;
      highBound = thisNightDay;
    }
    const data = await getLogsEvent(lowBound, highBound)
    console.log(data)
    process.nextTick(async () => {
      for (const event of data) {
        csvStream.write(event);
      }
      csvStream.end();
    });
    return csvStream;
  } catch (error) {
    throw error;
  }
}
