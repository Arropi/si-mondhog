import LogsDeviceEventClient from "../../modules/dashboard/logDeviceEvent/logDeviceEventClient";

export default function LogsDeviceEvent({ data }: { data: any[] }) {
    const formattedLogs = (data || []).map(log => ({
        date: log.formattedTimestamp?.split(',')[0] || "",
        name: log.name || "",
        deviceName: log.hostname || "",
        os: log.os || "",
        event: log.action || ""
    }));

    return <LogsDeviceEventClient initialData={formattedLogs} />;
}
