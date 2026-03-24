import LogsCsv from "../models/logs-csv.js"

export async function addLogsCsv(machineId, userId) {
    try {
        const newLog = new LogsCsv({ machineId, userId });
        await newLog.save();
        return newLog
    } catch (error) {
        throw error
    }
}

export async function getLogsCsv(){
    try {
        
    } catch (error) {
        throw error
    }
}