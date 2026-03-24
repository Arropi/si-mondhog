import mongoose from "mongoose";

const logsCsvSchema = new mongoose.Schema({
    machineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Machine",
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
})

const LogsCsv = mongoose.model("LogsCsv", logsCsvSchema)
export default LogsCsv