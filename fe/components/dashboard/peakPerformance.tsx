import PeakPerformanceClient from "@/modules/dashboard/peakPerformanceClient";
import { PeakMetrics } from "@/types";

export default function PeakPerformance({ data }: { data: PeakMetrics }) {
    const peakData = {
        ram: { 
            used: parseFloat((data?.maxRamUsage || 0).toFixed(1)), 
            total: parseFloat((data?.maxRam || 0).toFixed(1)), 
            percentage: Math.round(data?.maxRamUsage || 0),
            unit: "GB"
        },
        cpu: { 
            used: parseFloat((data?.maxCpuUsage || 0).toFixed(1)), 
            total: data?.maxCpu || 0, 
            percentage: Math.round(data?.maxCpuUsage || 0),
            unit: "Cores"
        },
        disk: { 
            used: parseFloat((data?.maxDiskUsage || 0).toFixed(1)), 
            total: data?.maxDisk || 0, 
            percentage: Math.round(data?.maxDiskUsage || 0),
            unit: "GB"
        }
    };
    return <PeakPerformanceClient initialData={peakData} />;
}
