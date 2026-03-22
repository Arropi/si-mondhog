import DatePickerClient from "@/modules/dashboard/datePickerClient";
import CpuAverageChart from "@/components/dashboard/cpuAverageChart";
import RamAverageChart from "@/components/dashboard/ramAverageChart";
import LogsGeneral from "@/components/dashboard/logsGeneral";
import PeakPerformance from "@/components/dashboard/peakPerformance";
import DeviceStats from "@/components/dashboard/deviceStats";

export default function DashboardPage() {
    return (
        <div className="w-full min-h-screen bg--background p-4 lg:p-8 font-sans">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content (Left) */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Header Summary */}
                    <div className="flex justify-between items-end mb-2">
                        <h1 className="text-3xl font-extrabold text-[#FF0B5B] tracking-tight">Summary</h1>
                        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                            <button className="text-[#6B46C1]">Days</button>
                            <button className="text-gray-300">Weeks</button>
                        </div>
                    </div>

                    {/* Date Picker */}
                    <DatePickerClient />

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <CpuAverageChart />
                        <RamAverageChart />
                    </div>

                    {/* Logs Table */}
                    <LogsGeneral />
                </div>

                {/* Sidebar (Right) */}
                <div className="w-full lg:w-[320px] flex flex-col gap-6 pt-1">
                    <PeakPerformance />
                    <DeviceStats />
                </div>
            </div>
        </div>
    );
}