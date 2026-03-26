import { addLogsEvent } from "../repositories/logs-event-repositories.js";
import { getShortLogsByMachineId, 
  getMetricsByMachineId, 
  getHighestStats 
} from "../repositories/machine-metrics-repositories.js";
import {
    createMachine,
  deleteMachine,
  findMachineById,
  getPaginatedMachines,
  updateMachine,
} from "../repositories/machine-repositories.js";
import { randomBytes, createHash } from "crypto";

// GET ALL
export async function getMachinesService(page, limit, search) {
  try {
    let { machines, totalMachines, statusMachine } = await getPaginatedMachines(page, limit, search);
    if (machines.length === 0) {
      const error = new Error("No machines found");
      error.statusCode = 404;
      throw error;
    }
    return { machines, totalMachines, stats: statusMachine };
  } catch (error) {
    throw error;
  }
}

// CRUD DEVICE
export async function getMachineByIdService(id, type) {
  try {
    let machine = await findMachineById(id);
    if (!machine) {
      const error = new Error("Machine not found");
      error.statusCode = 404;
      throw error;
    }
    const [logs, metrics, highestStats] = await Promise.allSettled([
      getShortLogsByMachineId(id),
      getMetricsByMachineId(id, type),
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

export async function addMachineService(hostname, os, userId) {
  try {
    const activationToken = randomBytes(3).toString("hex");
    const hashedToken = createHash("sha256").update(activationToken).digest("hex");
    let newMachine = await createMachine(hostname, os, hashedToken);
    await addLogsEvent(newMachine._id,userId, "Added", newMachine.os, newMachine.hostname )
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

export async function updateMachineService(id, updateData, userId) {
  try {
    let machine = await updateMachine(id, updateData);
    if (!machine) {
      const error = new Error("Machine not found");
      error.statusCode = 404;
      throw error;
    }
    await addLogsEvent(machine._id, userId, "Updated", machine.os, machine.hostname)
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

export async function deleteMachineService(id, userId) {
  try {
    const machine = await deleteMachine(id);
    if (!machine) {
      const error = new Error("Machine not found");
      error.statusCode = 404;
      throw error;
    }
    await addLogsEvent(id, userId, "Deleted", machine.os, machine.hostname)
    return machine;
  } catch (error) {
    throw error;
  }
}