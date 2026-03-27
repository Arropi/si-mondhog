import DeviceStatsClient from "@/modules/dashboard/deviceStatsClient";
import { DeviceStatsData } from "@/types";

export default function DeviceStats({ data, total }: { data: DeviceStatsData, total: { count: number } }) {
    const statsData = {
        total: total?.count || 0,
        online: data?.online || 0,
        offline: data?.offline || 0,
        pending: data?.pending || 0
    };
    return <DeviceStatsClient initialData={statsData} />;
}
