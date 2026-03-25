import mongoose from "mongoose";
import dotenv from "dotenv";
import MachineMetrics from "./models/machine-metrics-model.js";
import Machine from "./models/machine-model.js";

// Load environment variables dari .env.development.local
dotenv.config({ path: ".env.development.local" });
const DB_URI = process.env.DB_URI;

async function seedData() {
    try {
        await mongoose.connect(DB_URI);
        console.log("Terhubung ke MongoDB. Mempersiapkan data dummy di database asli...");
        
        // Cari machine yang ada. Kita utamakan ID dari screenshot kamu jika ada.
        const targetId = "69b96f3ef6a5d1a3167459f6";
        let machine = await Machine.findById(targetId);
        
        if (!machine) {
            // Jika ID dari screenshot tidak ada, kita ambil sembarang mesin pertama yang ada di database
            machine = await Machine.findOne(); 
        }

        if (!machine) {
            console.log("Tidak ada device/machine yang terdaftar di database. Silakan buat satu device terlebih dahulu.");
            return;
        }

        const machineIdStr = machine._id.toString();
        console.log("Menanamkan data ke Machine ID: " + machineIdStr);

        const dummyData = [];
        
        // 1) Spesifik request manual dari kamu (menggunakan tanggal 17/03/2026 sesuai tebakan saya karena di log kamu bulannya maret)
        dummyData.push({
            machineId: machineIdStr,
            cpuUsage: 45,
            ramUsage: 30,
            diskUsage: 38.5,
            timestamp: new Date("2026-03-17T22:00:00+07:00")
        });
        dummyData.push({
            machineId: machineIdStr,
            cpuUsage: 60,
            ramUsage: 50,
            diskUsage: 38.6,
            timestamp: new Date("2026-03-17T23:00:00+07:00")
        });
        dummyData.push({
            machineId: machineIdStr,
            cpuUsage: 35,
            ramUsage: 20,
            diskUsage: 38.6,
            timestamp: new Date("2026-03-18T17:00:00+07:00")
        });

        // 2) Kumpulan data 7 Hari full perjam = 168 data untuk support test filter 1h, 12h, 1d mu berkerja
        const now = new Date();
        for (let i = 0; i < 168; i++) {
            // Mundur 1 jam per iterasi (60*60*1000)
            let t = new Date(now.getTime() - i * 60 * 60 * 1000); 

            const hitungCpu = 40 + Math.sin(i / 2) * 20 + Math.random() * 5;
            // RAM nya dibikin persentase dari 0 - 100 agar grafisnya bagus
            const hitungRam = 30 + Math.cos(i / 3) * 15 + Math.random() * 5;
            // Disk stabil menanjak sedikittt
            const hitungDisk = 38.0 + (168 - i) * 0.05 + Math.random() * 0.1; 

            dummyData.push({
                machineId: machineIdStr,
                cpuUsage: hitungCpu,
                ramUsage: hitungRam,
                diskUsage: hitungDisk,
                timestamp: t
            });
        }
        
        await MachineMetrics.insertMany(dummyData);
        console.log("BERHASIL! " + dummyData.length + " data metrics riil telah dimaksukkan ke koleksi MachineMetrics.");

    } catch (e) {
        console.error("Terjadi error:", e);
    } finally {
        await mongoose.disconnect();
    }
}

seedData();
