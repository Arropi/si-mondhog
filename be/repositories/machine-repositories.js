import Machine from "../models/machine-model.js";
import { helperStatusMachine } from "../utils/helper.js";

export async function createMachine(hostname, os, activationToken) {
  try {
    const newMachine = new Machine({ hostname, os, activationToken });
    await newMachine.save();
    return newMachine;
  } catch (error) {
    throw error;
  }
}

export async function findMachineById(id) {
  try {
    const machine = await Machine.findById(id, {
      lastSeen: 0,
      activationToken: 0,
      hashApiKey: 0,
    });
    return machine;
  } catch (error) {
    throw error;
  }
}

export async function updateMachine(id, updateData) {
  try {
    const updatedMachine = await Machine.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });
    return updatedMachine;
  } catch (error) {
    throw error;
  }
}

export async function deleteMachine(id) {
  try {
    const machine = await Machine.findByIdAndDelete(id);
    return machine;
  } catch (error) {
    throw error;
  }
}

export async function getPaginatedMachines(page, limit) {
  try {
    const [data] = await Machine.aggregate([
      {
        $match: {},
      },
      {
        $addFields: helperStatusMachine(),
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $facet: {
          machines: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
            { $project: { activationToken: 0, hashApiKey: 0 } },
          ],
          totalMachines: [{ $count: "count" }],
        },
      },
    ]);
    const { machines, totalMachines } = data;
    return {
      machines,
      totalMachines: totalMachines.length > 0 ? totalMachines[0].count : 0,
    };
  } catch (error) {
    throw error;
  }
}

export async function getStatsStatusMachine() {
  try {
    const stats = await Machine.aggregate([
      {
        $addFields: helperStatusMachine(),
      },
      {
        $group: {
          _id: null,
          online: {
            $sum: {
              $cond: [{ $eq: ["$status", "Online"] }, 1, 0],
            },
          },
          offline: {
            $sum: {
              $cond: [{ $eq: ["$status", "Offline"] }, 1, 0],
            },
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ["$status", "Pending"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
            _id: 0
        }
      }
    ]);
    return stats
  } catch (error) {
    throw error;
  }
}

export async function getMachineByActivationToken(activationToken) {
  try {
    const machine = await Machine.findOne(
      { activationToken },
      { activationToken: 1 },
    );
    return machine;
  } catch (error) {
    throw error;
  }
}

export async function getMachineByApiKey(hashApiKey) {
  try {
    const machine = await Machine.findOne({ hashApiKey }, { hashApiKey: 1 });
    return machine;
  } catch (error) {
    throw error;
  }
}

export async function getLogsMachineId(machineId){
  try {
    
  } catch (error) {
    throw error
  }
}