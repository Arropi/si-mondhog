import mongoose from "mongoose";
import { DB_URI } from "./env.js";
export const connectDB = async () => {
    if (!DB_URI) {
        throw new Error("Need to provide DB_URI")
    }
    try {
        await mongoose.connect(DB_URI)
        console.log("Connected to MongoDB")
    } catch (error) { 
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)
    }
}