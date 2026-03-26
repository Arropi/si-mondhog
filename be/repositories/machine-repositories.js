import Machine from "../models/machine-model.js";
import { helperStatusMachine } from "../utils/helper.js";

// CRUD DEVICE
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

// GET ALL
export async function getPaginatedMachines(page, limit, search) {
  try {
    const [data] = await Machine.aggregate([
      {
        $match: { hostname: { $regex: search, $options: "i" } },
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
          statusMachine: [
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
          ]
        },
      },
    ]);
    const { machines, totalMachines, statusMachine } = data;
    return {
      machines,
      totalMachines: totalMachines.length > 0 ? totalMachines[0].count : 0,
      statusMachine
    };
  } catch (error) {
    throw error;
  }
}

// For Agent
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

// For Dashboard
export async function getMaxSpecificationMachine(){
  try {
    const [data] = await Machine.aggregate([
      {
        $addFields: helperStatusMachine()
      },
      {
        $facet: {
          highestSpecification: [
            {
              $group: {
                _id: null,
                maxCpu: { $max: "$cpuCores"},
                maxRam: { $max: "$totalRam" },
                maxDisk: { $max: "$totalDisk" }
              }
            },
            {
              $project: {
                _id: 0,
                maxCpu: 1,
                maxRam: 1,
                maxDisk: 1
              }
            }
          ],
          statusMachine: [
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
          ],
          totalMachine: [{ $count: "count" }],
        }
      },
    ])
    const {highestSpecification, statusMachine, totalMachine} = data
    return {
      highestSpecification,
      statusMachine,
      totalMachine
    }
  } catch (error) {
    throw error
  }
}