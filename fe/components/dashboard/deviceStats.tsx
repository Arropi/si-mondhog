import DeviceStatsClient from "@/modules/dashboard/deviceStatsClient";
import { DeviceStatsData } from "@/types";

export default function DeviceStats({ data, total }: { data: DeviceStatsData, total: any }) {
    const statsData = {
        total: typeof total === 'object' ? (total?.count || 0) : (total || 0),
        online: data?.online || 0,
        offline: data?.offline || 0,
        pending: data?.pending || 0
    };
    return <DeviceStatsClient initialData={statsData} />;
}
