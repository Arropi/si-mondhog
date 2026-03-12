import mongoose from "mongoose";

const machineSchema = new mongoose.Schema({
    hostname: {
        type: String,
        required: true,
    },
    os: {
        type: Enum,
        values: ['Windows', 'Linux', 'macOS'],
        required: true,
        default: 'Windows',
    },
    activationToken: {
        type: String | null,
    },
    hashApiKey: {
        type: String | null,
    },
    cpuCores: {
        type: Number | null,
    },
    totalRam: {
        type: Number | null,
    },
    totalDisk: {
        type: Number | null,
    },
    lastSeen: {
        type: Date | null,
    }
}, { timestamps: true })

const Machine = mongoose.model("Machine", machineSchema)
export default Machine