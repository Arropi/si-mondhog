import DatePickerClient from "@/modules/dashboard/datePickerClient";
import CpuAverageChart from "@/components/dashboard/cpuAverageChart";
import RamAverageChart from "@/components/dashboard/ramAverageChart";
import HarddiskAverageChart from "@/components/dashboard/harddiskAverageChart";
import LogsGeneral from "@/components/dashboard/logDevicePerformance";
import PeakPerformance from "@/components/dashboard/peakPerformance";
import DeviceStats from "@/components/dashboard/deviceStats";
import LogsDeviceEvent from "../../components/dashboard/logDeviceEvent";
import { getDashboardSummary } from "../../service/dashboardService";
import DatePickerWeeks from "./datePickerWeeks";

export default async function DashboardPage({ date }: { date?: string }) {
    const data = await getDashboardSummary(date);
    const isWeeksMode = !date;
    const todayDate = new Date().toISOString().split("T")[0];

    const summary = data || {
        metrics: [],
        peak: { maxCpuUsage: 0, maxRamUsage: 0, maxDiskUsage: 0, maxRam: 0, maxCpu: 0, maxDisk: 0 },
        stats: { online: 0, offline: 0, pending: 0 },
        total: 0,
        logs: { performance: [], events: [] }
    };

    return (
        <div key={date || "weeks"} className="w-full min-h-screen bg--background p-4 lg:p-8 font-sans animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content (Left) */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Header Summary */}
                    <div className="flex justify-between items-end mb-2">
                        <h1 className="text-3xl font-extrabold text-[#FF0B5B] tracking-tight">Summary</h1>
                        <div className="flex gap-4 text-sm font-bold uppercase tracking-wider">
                            <a href={`/dashboard?date=${todayDate}`} className={!isWeeksMode ? "text--primary" : "text-gray-300"}>Days</a>
                            <a href={`/dashboard`} className={isWeeksMode ? "text--primary" : "text-gray-300"}>Weeks</a>
                        </div>
                    </div>

                    {/* Date Picker */}
                    {isWeeksMode ? (
                        <DatePickerWeeks />
                    ) : (
                        <DatePickerClient selectedDate={date} />
                    )}

                    {/* Charts RAM */}
                    <div>
                        <RamAverageChart data={summary.metrics} />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <CpuAverageChart data={summary.metrics} />
                        <HarddiskAverageChart data={summary.metrics} />
                    </div>

                    {/* Logs Table */}
                    <LogsGeneral data={summary.logs.performance} />
                    <LogsDeviceEvent data={summary.logs.events} />
                </div>

                {/* Sidebar (Right) */}
                <div className="w-full lg:w-[320px] flex flex-col gap-6">
                    <div className="flex items-end mb-2 h-[34px]">
                        <h2 className="text-sm font-extrabold text-[#FF0B5B] tracking-wide uppercase">Peak Performance</h2>
                    </div>
                    <PeakPerformance data={summary.peak} />
                    <DeviceStats data={summary.stats} total={summary.total} />
                </div>
            </div>
        </div>
    );
}