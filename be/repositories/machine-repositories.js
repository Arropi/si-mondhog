import Machine from "../models/machine-model.js";

export async function createMachine( hostname, os, activationToken) {
    try {
        const newMachine = new Machine({ hostname, os, activationToken});
        await newMachine.save();
        return newMachine;
    } catch (error) {
        throw error;
    }
}

export async function findMachineById(id) {
    try {
        const machine = await Machine.findById(id);
        return machine;
    } catch (error) {
        throw error;
    }
}

export async function updateMachine(id, updateData) {
    try {
        const updatedMachine = await Machine.findByIdAndUpdate(id, updateData, { returnDocument: "after" });
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
        const machines = await Machine.find({}, { hostname: 1, os: 1, activationToken: 1, lastSeen: 1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const totalMachines = await Machine.countDocuments();
        return { machines, totalMachines };
    } catch (error) {
        console.log("tes");
        throw error;
    }
}