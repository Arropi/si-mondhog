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

// machineSchema.virtual("status").get(function () {
//     if (this.activationToken) {
//         return "Pending";
//     } else if (this.lastSeen && Date.now() - this.lastSeen.getTime() < 5 * 60 * 1000) {
//         return "Online";
//     } else {        
//         return "Offline";
//     }
// })

// machineSchema.set("toObject", { virtuals: true })
// machineSchema.set("toJSON", { virtuals: true })

const Machine = mongoose.model("Machine", machineSchema)
export default Machine