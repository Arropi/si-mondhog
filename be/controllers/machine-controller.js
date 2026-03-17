import { getMachineByIdService, getMachinesService, addMachineService, updateMachineService, deleteMachineService } from "../services/machine-service.js";
import { sendEmail } from "../services/node-email-service.js";

export async function getMachines(req, res, next) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { machines, totalMachines } = await getMachinesService(parseInt(page), parseInt(limit));
        res.status(200).json({
            "message": "Machines retrieved successfully",
            "machines": machines,
            "totalMachines": totalMachines
        });
    } catch (error) {
        next(error);
    }
}

export async function getMachineById(req, res, next) {
    try {
        const { _id } = req.params;
        const machine = await getMachineByIdService(_id)
        res.status(200).json({
            "message": "Machine retrieved successfully",
            "machine": machine
        });
    } catch (error) {
        next(error);
    }
}

export async function addMachine(req, res, next) {
    try {
        const { hostname, os, email } = req.body;
        const newMachine = await addMachineService(hostname, os);
        await sendEmail(email, newMachine.token)
        res.status(201).json({
            "message": "Machine added successfully",
            "machine": newMachine
        });
    } catch (error) {
        next(error);
    }   
}

export async function updateMachine(req, res, next) {
    try {
        const { _id } = req.params;
        const updateData = req.body;
        const machine = await updateMachineService(_id, updateData);
        res.status(200).json({
            "message": "Machine updated successfully",
            "machine": machine
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteMachine (req, res, next) {
    try {
        const { _id } = req.params;
        const machine = await deleteMachineService(_id);
        res.status(200).json({
            "message": "Machine deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}