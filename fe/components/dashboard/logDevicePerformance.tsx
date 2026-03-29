import LogsGeneralClient from "@/modules/dashboard/logDevicePerformance/logDevicePerformanceClient";
import { PerformanceLog } from "@/types";

export default function LogsGeneral({ data }: { data: PerformanceLog[] }) {
    const formattedLogs = (data || []).map(log => ({
        date: log.formattedTimestamp?.split(',')[0] || "",
        name: log.hostname || "",
        os: log.os || "",
        cpu: Math.round(log.cpuUsage || 0),
        ram: Math.round(log.ramUsage || 0),
        disk: Math.round(log.diskUsage || 0),
        timestamp: log.formattedTimestamp?.split(',')[1]?.trim() || ""
    }));
    return <LogsGeneralClient initialData={formattedLogs} />;
}
