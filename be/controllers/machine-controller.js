import { getMachineByIdService, getMachinesService, addMachineService, updateMachineService, deleteMachineService } from "../services/machine-service.js";
import { sendEmail } from "../services/node-email-service.js";

export async function getMachines(req, res, next) {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const { machines, totalMachines, stats } = await getMachinesService(
            parseInt(page),
            parseInt(limit),
            search
        );
        res.status(200).json({
            "message": "Machines retrieved successfully",
            "datas": {
                machines,
                stats,
                totalMachines
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function getMachineById(req, res, next) {
    try {
        const { _id } = req.params;
        const { timeSeries = "1h" } = req.query
        const data = await getMachineByIdService(_id, timeSeries);
        res.status(200).json({
            "message": "Machine retrieved successfully",
            "datas": data
        });
    } catch (error) {
        next(error);
    }
}

export async function addMachine(req, res, next) {
    try {
        const { hostname, os, email } = req.body;
        const {id} = req.user
        const newMachine = await addMachineService(hostname, os, id);
        await sendEmail(email, newMachine.token, os)
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
        const { id } = req.user
        const updateData = req.body;
        const machine = await updateMachineService(_id, updateData, id);
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
        const {id} = req.user
        const machine = await deleteMachineService(_id, id);
        res.status(200).json({
            "message": "Machine deleted successfully",
            "data": machine
        });
    } catch (error) {
        next(error);
    }
}