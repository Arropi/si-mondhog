import mongoose from "mongoose";
import { is } from "zod/v4/locales";

const LogsDeviceSchema = new mongoose.Schema({
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
    isActivated: {
        type: Boolean,
        required: true,
        default: false,
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
    },
    action: {
        type: String,
        enum: ['Added', 'Updated', 'Deleted'],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
})
const LogsDevice = mongoose.model("LogsDevice", LogsDeviceSchema)
export default LogsDevice