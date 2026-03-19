import DeviceStatsClient from "@/modules/dashboard/deviceStatsClient";

const DUMMY_STATS = {
    total: 24,
    online: 24,
    offline: 24,
    pending: 24
};

export default async function DeviceStats() {
    return <DeviceStatsClient initialData={DUMMY_STATS} />;
}
