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
    peak: {
      maxCpuUsage: 0,
      maxRamUsage: 0,
      maxDiskUsage: 0,
      maxRam: 0,
      maxCpu: 0,
      maxDisk: 0,
    },
    stats: { online: 0, offline: 0, pending: 0 },
    total: 0,
    logs: { performance: [], events: [] },
  };

  return (
    <div
      id={`dashboard-page-${date || "weeks"}`}
      key={date || "weeks"}
      className="w-full min-h-screen bg--background p-4 lg:p-8 font-sans animate-fade-in"
    >
      <div
        id="dashboard-layout"
        className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start w-full"
      >
        {/* Main Content (Left) */}
        <div id="dashboard-main-column" className="flex flex-col gap-6 min-w-0">
          {/* Header Summary */}
          <div
            id="dashboard-header"
            className="flex justify-between items-end mb-2 h-[40px] pb-1"
          >
            <h1
              id="dashboard-summary-title"
              className="text-3xl font-extrabold text-[#FF0B5B] tracking-tight leading-none"
            >
              Summary
            </h1>
            <div
              id="dashboard-period-switcher"
              className="flex gap-4 text-sm font-bold uppercase tracking-wider"
            >
              <a
                id="dashboard-period-days"
                href={`/dashboard?date=${todayDate}`}
                className={!isWeeksMode ? "text--primary" : "text-gray-300"}
              >
                Days
              </a>
              <a
                id="dashboard-period-weeks"
                href={`/dashboard`}
                className={isWeeksMode ? "text--primary" : "text-gray-300"}
              >
                Weeks
              </a>
            </div>
          </div>

          {/* Date Picker */}
          {isWeeksMode ? (
            <div id="dashboard-date-picker-weeks">
              <DatePickerWeeks />
            </div>
          ) : (
            <div id="dashboard-date-picker-days">
              <DatePickerClient selectedDate={date} />
            </div>
          )}

          {/* Charts RAM */}
          <div id="dashboard-ram-chart">
            <RamAverageChart data={summary.metrics} />
          </div>

          {/* Charts */}
          <div
            id="dashboard-secondary-charts"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
          >
            <div id="dashboard-cpu-chart">
              <CpuAverageChart data={summary.metrics} />
            </div>
            <div id="dashboard-harddisk-chart">
              <HarddiskAverageChart data={summary.metrics} />
            </div>
          </div>

          {/* Logs Table */}
          <div id="dashboard-performance-logs">
            <LogsGeneral data={summary.logs.performance} />
          </div>
          <div id="dashboard-event-logs">
            <LogsDeviceEvent data={summary.logs.events} />
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div
          id="dashboard-sidebar"
          className="w-full flex flex-col gap-6 lg:sticky lg:top-20"
        >
          <div
            id="dashboard-sidebar-title-wrap"
            className="flex items-end mb-2 h-[40px] pb-1"
          >
            <h2
              id="dashboard-sidebar-title"
              className="text-sm font-extrabold text--secondary tracking-wide uppercase leading-none"
            >
              Peak Performance
            </h2>
          </div>
          <div id="dashboard-peak-performance">
            <PeakPerformance data={summary.peak} />
          </div>
          <div id="dashboard-device-stats">
            <DeviceStats data={summary.stats} total={summary.total} />
          </div>
        </div>
      </div>
    </div>
  );
}
