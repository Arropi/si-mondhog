import LogDeviceActivityClient from "../../modules/deviceDetail/logDeviceActivityClient";
import { getLogDeviceActivity } from "../../service/deviceService";

const DUMMY_LOGS = [
    { cpu: 30, ram: 60, disk: 40, timestamp: "10:00" },
    { cpu: 35, ram: 62, disk: 40, timestamp: "10:05" },
    { cpu: 28, ram: 58, disk: 40, timestamp: "10:10" },
    { cpu: 32, ram: 61, disk: 41, timestamp: "10:15" },
    { cpu: 80, ram: 65, disk: 41, timestamp: "10:20" },
];

export default async function LogDeviceActivity({ deviceId }: { deviceId: string }) {
    const data = await getLogDeviceActivity(deviceId);
    const initialData = (data && data.length > 0) ? data : DUMMY_LOGS;

    return (
        <LogDeviceActivityClient
            deviceId={deviceId}
            initialData={initialData}
        />
    );
}