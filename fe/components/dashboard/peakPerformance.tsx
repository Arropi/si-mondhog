import PeakPerformanceClient from "@/modules/dashboard/peakPerformanceClient";

export default function PeakPerformance({ data }: { data: any }) {
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
        }
    };
    return <PeakPerformanceClient initialData={peakData} />;
}
