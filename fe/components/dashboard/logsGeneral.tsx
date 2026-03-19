import LogsGeneralClient from "@/modules/dashboard/logsGeneralClient";

const DUMMY_LOGS = Array(8).fill(null).map((_, i) => ({
    date: "20/12/2026",
    name: "PC Leb 1",
    os: "Windows",
    cpu: 80,
    ram: 76,
    disk: 87,
    timestamp: "10.56"
}));

export default async function LogsGeneral() {
    return <LogsGeneralClient initialData={DUMMY_LOGS} />;
}
