import mongoose from "mongoose";

const machineSchema = new mongoose.Schema({
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
    activationToken: {
        type: String,
        default: null
    },
    hashApiKey: {
        type: String,
        default: null
    },
    cpuCores: {
        type: Number,
        default: null
    },
    totalRam: {
        type: Number,
        default: null
    },
    totalDisk: {
        type: Number,
        default: null
    },
    lastSeen: {
        type: Date,
        default: null,
    }
}, { timestamps: true })

const Machine = mongoose.model("Machine", machineSchema)
export default Machine