import DeviceMonitorCard from "../../components/device/deviceMonitorCard";

// Tipe data (interface) untuk hasil response dari backend
interface DeviceStats {
    total: number;
    online: number;
    offline: number;
    pending: number;
}

export default function DeviceMonitor({ total, online, offline, pending }: DeviceStats) {


    // Menampilkan rangka abu-abu (Skeleton) selagi isLoading adalah true


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            {/* Card: Total Devices */}
            <DeviceMonitorCard title="Total Device" amount={total} className="text--primary" />

            {/* Card: Online */}
            <DeviceMonitorCard title="Online" amount={online} className="text--green" />

            {/* Card: Offline */}
            <DeviceMonitorCard title="Offline" amount={offline} className="text--danger" />

            {/* Card: Pending */}
            <DeviceMonitorCard title="Pending" amount={pending} className="text--yellow" />

        </div>
    );
}