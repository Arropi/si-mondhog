import mongoose from "mongoose";

const machineMetricsSchema = new mongoose.Schema({
    machineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Machine",
        required: true,
        index: true,
    },
    cpuUsage: {
        type: Number,
        required: true,
    },
    ramUsage: {
        type: Number,
        required: true,
    },
    diskUsage: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
})

machineMetricsSchema.virtual("formattedTimestamp").get(function() {
    return this.timestamp.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
})

machineMetricsSchema.set("toObject", { virtuals: true })
machineMetricsSchema.set("toJSON", { virtuals: true })

const MachineMetrics = mongoose.model("MachineMetrics", machineMetricsSchema)
export default MachineMetrics