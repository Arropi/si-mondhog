import PeakPerformanceClient from "@/modules/dashboard/peakPerformanceClient";

const DUMMY_PEAK = {
    ram: { used: 10, total: 16, percentage: 80 },
    cpu: { used: 16, total: 16, percentage: 100 }
};

export default async function PeakPerformance() {
    return <PeakPerformanceClient initialData={DUMMY_PEAK} />;
}
