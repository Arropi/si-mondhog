import PerformanceSummaryClient from "../../modules/deviceDetail/performanceSummary";
import { getPerformanceData } from "../../service/deviceService";

const dummy_data = {
    highestCpuUsage: 90,
    cpuChange: 30,
    highestRamUsage: 62,
    ramChange: 3,
}

export default async function PerformanceSummary({ deviceId }: { deviceId: string }) {
    const data = await getPerformanceData(deviceId);
    const initialData = data || dummy_data;

    return (
        <PerformanceSummaryClient
            deviceId={deviceId}
            initialData={initialData} />
    )
}