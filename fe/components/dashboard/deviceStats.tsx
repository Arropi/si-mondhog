import DeviceStatsClient from "@/modules/dashboard/deviceStatsClient";

export default function DeviceStats({ data, total }: { data: any, total: any }) {
    const statsData = {
        total: total?.count || 0,
        online: data?.online || 0,
        offline: data?.offline || 0,
        pending: data?.pending || 0
    };
    return <DeviceStatsClient initialData={statsData} />;
}
