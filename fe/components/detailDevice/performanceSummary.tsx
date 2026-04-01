import PerformanceSummaryClient from "../../modules/deviceDetail/performanceSummary";
import { getPerformanceData } from "../../service/deviceService";

export default async function PerformanceSummary({ deviceId }: { deviceId: string }) {
    const data = await getPerformanceData(deviceId);
    const initialData = data || null;
    console.log(initialData); 
    return (
        <PerformanceSummaryClient
            deviceId={deviceId}
            initialData={initialData} />
    )
}