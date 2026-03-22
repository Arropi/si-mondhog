import mongoose from "mongoose"
import MachineMetrics from "../models/machine-metrics-model.js"
import { getTimeWeeksAgo } from "../utils/helper.js"

export async function addNewData(dataMetrics) {
    try {
        const newMetrics = new MachineMetrics(dataMetrics)
        await newMetrics.save()
        return newMetrics
    } catch (error) {
        throw error   
    }
}

export async function getMetricsByMachineId(machineId){
    try {
        const { oneWeekAgo, thisNightDay } = getTimeWeeksAgo();
        const metrics = await MachineMetrics.aggregate([
            {
                $match: {
                    machineId: new mongoose.Types.ObjectId(machineId),
                    timestamp: {
                        $gte: oneWeekAgo,
                        $lte: thisNightDay
                    }
                }
            }, 
            {
                $group: {
                    _id: {
                        year: { $year: "$timestamp" },
                        month: { $month: "$timestamp" },
                        day: { $dayOfMonth: "$timestamp" },
                        hour: { $hour: "$timestamp" }
                    },
                    averageCpuUsage: { $avg: "$cpuUsage" },
                    averageRamUsage: { $avg: "$ramUsage" },
                    averageDiskUsage: { $avg: "$diskUsage" }
                }
            },
            {
                $sort: {
                    "_id": 1
                }
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
                                    hour: "$_id.hour"
                                }
                            },
                            timezone: "Asia/Jakarta"
                        }
                    }
                }
            }
        ])
        return metrics
    } catch (error) {
        throw error
    }
}

export async function getMetcricsTest(machineId) {
    try {
        const { oneWeekAgo, thisNightDay } = getTimeWeeksAgo()
        const metrics = await MachineMetrics.aggregate([
            {
                $match: {
                    machineId: new mongoose.Types.ObjectId(machineId),
                    timestamp: {
                        $gte: oneWeekAgo,
                        $lte: new Date()
                    }
                }
            },
        ])
        return metrics
    } catch (error) {
        throw error
    }
}

export async function getLogsByMachineId(machineId) {
    try {
        const metrics = await MachineMetrics.find({ machineId }, {  machineId: 0, __v: 0 }).sort({ timestamp: -1 }).limit(10)
        return metrics
    } catch (error) {
        throw error
    }
}

export async function getHighestStats(machineId) {
    try {
        const { oneWeekAgo, thisNightDay } = getTimeWeeksAgo()
        const stats = await MachineMetrics.aggregate([
            {
                $match: {
                    machineId: new mongoose.Types.ObjectId(machineId),
                    timestamp: {
                        $gte: oneWeekAgo,
                        $lte: thisNightDay
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    cpu: { $max: "$cpuUsage" },
                    ram: { $max: "$ramUsage" },
                    disk: { $max: "$diskUsage" }
                }
            },
            {
                $project: {
                    _id: 0,
                    cpu: 1,
                    ram: 1,
                    disk: 1
                }
            }
        ])
        return stats
    } catch (error) {
        throw error
    }
}

