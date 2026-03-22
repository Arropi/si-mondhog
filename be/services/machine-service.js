import { getLogsByMachineId, 
  getMetricsByMachineId, 
  getMetcricsTest, 
  getHighestStats 
} from "../repositories/machine-metrics-repositories.js";
import {
    createMachine,
  deleteMachine,
  findMachineById,
  getPaginatedMachines,
  getStatsStatusMachine,
  updateMachine,
} from "../repositories/machine-repositories.js";
import { randomBytes, createHash } from "crypto";

export async function getMachinesService(page, limit) {
  try {
    let { machines, totalMachines } = await getPaginatedMachines(page, limit);
    if (machines.length === 0) {
      const error = new Error("No machines found");
      error.statusCode = 404;
      throw error;
    }
    const stats = await getStatsStatusMachine()
    return { machines, totalMachines, stats: stats[0] };
  } catch (error) {
    throw error;
  }
}

export async function getMachineByIdService(id) {
  try {
    let machine = await findMachineById(id);
    if (!machine) {
      const error = new Error("Machine not found");
      error.statusCode = 404;
      throw error;
    }
    const [logs, metrics, highestStats] = await Promise.allSettled([
      getLogsByMachineId(id),
      getMetricsByMachineId(id),
      getHighestStats(id)
    ])
    return { 
      machine, 
      logs: logs.status === "fulfilled" ? logs.value : null, 
      metrics: metrics.status === "fulfilled" ? metrics.value : null,
      highestStats: highestStats.status === "fulfilled" ? highestStats.value : null };
  } catch (error) {
    throw error;
  }
}

export async function addMachineService(hostname, os) {
  try {
    const activationToken = randomBytes(3).toString("hex");
    const hashedToken = createHash("sha256").update(activationToken).digest("hex");
    let newMachine = await createMachine(hostname, os, hashedToken);
    newMachine = {
      ...newMachine._doc,
      status: "Pending",
      token: activationToken
    }; 
    return newMachine;
  } catch (error) {
    throw error;
  }
}

export async function updateMachineService(id, updateData) {
  try {
    let machine = await updateMachine(id, updateData);
    if (!machine) {
      const error = new Error("Machine not found");
      error.statusCode = 404;
      throw error;
    }
    machine = {
      ...machine._doc,
      status: machine.activationToken
        ? "Pending"
        : machine.lastSeen &&
            Date.now() - machine.lastSeen.getTime() < 5 * 60 * 1000
          ? "Online"
          : "Offline",
    };
    return machine;
  } catch (error) {
    throw error;
  }
}

export async function deleteMachineService(id) {
  try {
    const machine = await deleteMachine(id);
    if (!machine) {
      const error = new Error("Machine not found");
      error.statusCode = 404;
      throw error;
    }
    return machine;
  } catch (error) {
    throw error;
  }
}