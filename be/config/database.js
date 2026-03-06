import mongoose from "mongoose";
export const connectDB = async (DB_URI) => {
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