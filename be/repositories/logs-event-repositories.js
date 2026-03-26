import LogsEvent from "../models/logs-event.js";
import { helperFormattedTimestamp } from "../utils/helper.js";

export async function addLogsEvent(machineId, userId, action, os, hostname) {
  try {
    const newLog = new LogsEvent({ machineId, userId, action, os, hostname });
    await newLog.save();
    return newLog;
  } catch (error) {
    throw error;
  }
}

export async function getLogsEvent(lowBound, highBound, limit) {
  try {
    const pipeline = [
      {
        $addFields: helperFormattedTimestamp(),
      },
      {
        $match: {
          timestamp: {
            $gte: lowBound,
            $lte: highBound,
          },
        },
      },
      {
        $project: {
          machineId: 0,
          timestamp: 0,
          __v: 0,
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1
              },
            },
          ],
          as: "user",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
            user: 0,
            userId: 0
        }
      }
    ];
    if (limit) pipeline.push({ $limit: limit });
    const logs = LogsEvent.aggregate(pipeline);
    console.log(logs);
    return logs;
  } catch (error) {
    throw error;
  }
}
