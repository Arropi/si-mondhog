import mongoose from "mongoose";

const logsEventSchema = new mongoose.Schema({
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
    hostname: {
        type: String,
        required: true,
    },
    os: {
        type: String,
        enum: ['Windows', 'Linux', 'macOS'],
        required: true,
        default: 'Windows',
    },
    action: {
        type: String,
        enum: ["Added", "Updated", "Deleted", "Exported"],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
})

const LogsEvent = mongoose.model("LogsEvent", logsEventSchema)
export default LogsEvent