import mongoose from "mongoose";
import MachineMetrics from "../models/machine-metrics-model.js";
import {
  getTimeWeeksAgo,
  grouppingType,
  helperFormattedTimestamp,
} from "../utils/helper.js";

// For Agent Metrics
export async function addNewData(dataMetrics) {
  try {
    const newMetrics = new MachineMetrics(dataMetrics);
    await newMetrics.save();
    return newMetrics;
  } catch (error) {
    throw error;
  }
}

// For Detail Machine
export async function getMetricsByMachineId(machineId, type) {
  try {
    const { oneWeekAgo, thisNightDay } = getTimeWeeksAgo();
    const metrics = await MachineMetrics.aggregate([
      {
        $match: {
          machineId: new mongoose.Types.ObjectId(machineId),
          timestamp: {
            $gte: oneWeekAgo,
            $lte: thisNightDay,
          },
        },
      },
      {
        $group: {
          _id: grouppingType(type),
          averageCpuUsage: { $avg: "$cpuUsage" },
          averageRamUsage: { $avg: "$ramUsage" },
          averageDiskUsage: { $avg: "$diskUsage" },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          _id: 0,
          averageCpuUsage: 1,
          averageRamUsage: 1,
          averageDiskUsage: 1,
          timestamp: {
            $dateToString: {
              format: "%Y-%m-%d %H:00:00",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                  hour: "$_id.hour",
                },
              },
              timezone: "Asia/Jakarta",
            },
          },
        },
      },
    ]);
    return metrics;
  } catch (error) {
    throw error;
  }
}

export async function getShortLogsByMachineId(machineId) {
  try {
    const metrics = await MachineMetrics.aggregate([
      {
        $addFields: helperFormattedTimestamp(),
      },
      {
        $match: {
          machineId: new mongoose.Types.ObjectId(machineId),
        },
      },
      {
        $project: {
          machineId: 0,
          timestamp: 0,
          __v: 0,
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    return metrics;
  } catch (error) {
    throw error;
  }
}

export async function getHighestStats(machineId) {
  try {
    const { oneWeekAgo, thisNightDay } = getTimeWeeksAgo();
    const stats = await MachineMetrics.aggregate([
      {
        $match: {
          machineId: new mongoose.Types.ObjectId(machineId),
          timestamp: {
            $gte: oneWeekAgo,
            $lte: thisNightDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          cpu: { $max: "$cpuUsage" },
          ram: { $max: "$ramUsage" },
          disk: { $max: "$diskUsage" },
        },
      },
      {
        $project: {
          _id: 0,
          cpu: 1,
          ram: 1,
          disk: 1,
        },
      },
    ]);
    return stats;
  } catch (error) {
    throw error;
  }
}

// For CSV Export
export async function getLogsMetricsByMachineId(machineId) {
  try {
    const { oneWeekAgo, thisNightDay } = getTimeWeeksAgo();
    const metrics = await MachineMetrics.aggregate([
      {
        $addFields: helperFormattedTimestamp(),
      },
      {
        $match: {
          machineId: new mongoose.Types.ObjectId(machineId),
          timestamp: {
            $gte: oneWeekAgo,
            $lte: thisNightDay,
          },
        },
      },
      {
        $lookup: {
          from: "machines",
          localField: "machineId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
                activationToken: 0,
                hashApiKey: 0,
                lastSeen: 0,
              },
            },
          ],
          as: "machine",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$machine", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          machine: 0,
          machineId: 0,
          timestamp: 0,
          __v: 0,
          _id: 0,
        },
      },
    ]);
    return metrics;
  } catch (error) {
    throw error;
  }
}

// For Summary Dashboard
export async function getSummaryMetrics(lowBound, highBound) {
  try {
    const [datas] = await MachineMetrics.aggregate([
      {
        $match: {
          timestamp: {
            $gte: lowBound,
            $lte: highBound,
          },
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
      {
        $facet: {
          metrics: [
            {
              $addFields: helperFormattedTimestamp(),
            },
            {
              $group: {
                _id: grouppingType("1h"),
                averageCpuUsage: { $avg: "$cpuUsage" },
                averageRamUsage: { $avg: "$ramUsage" },
                averageDiskUsage: { $avg: "$diskUsage" },
              },
            },
            {
              $project: {
                _id: 0,
                timestamp: {
                  $dateToString: {
                    format: "%Y-%m-%d %H:00:00",
                    date: {
                      $dateFromParts: {
                        year: "$_id.year",
                        month: "$_id.month",
                        day: "$_id.day",
                        hour: "$_id.hour",
                      },
                    },
                    timezone: "Asia/Jakarta",
                  },
                },
                averageCpuUsage: 1,
                averageRamUsage: 1,
                averageDiskUsage: 1,
              },
            },
          ],
          peakMetrics: [
            {
              $group: {
                _id: null,
                maxCpuUsage: { $max: "$cpuUsage" },
                maxRamUsage: { $max: "$ramUsage" },
                maxDiskUsage: { $max: "$diskUsage" },
              },
            },
            {
              $project: {
                _id: 0,
                maxCpuUsage: 1,
                maxRamUsage: 1,
                maxDiskUsage: 1,
              },
            },
          ],
        },
      },
    ]);
    return datas;
  } catch (error) {
    throw error;
  }
}

// Percobaan nanti bakalan dihapus
export async function getMetcricsTest(machineId) {
  try {
    const { oneWeekAgo, thisNightDay } = getTimeWeeksAgo();
    const metrics = await MachineMetrics.aggregate([
      {
        $match: {
          machineId: new mongoose.Types.ObjectId(machineId),
          timestamp: {
            $gte: oneWeekAgo,
            $lte: thisNightDay,
          },
        },
      },
    ]);
    return metrics;
  } catch (error) {
    throw error;
  }
}
