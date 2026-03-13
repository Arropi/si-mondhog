import MachineMetrics from "../models/machine-metrics-model.js"

export async function addNewData(dataMetrics) {
    try {
        const newMetrics = new MachineMetrics(dataMetrics)
        await newMetrics.save()
        return newMetrics
    } catch (error) {
        throw error   
    }
}