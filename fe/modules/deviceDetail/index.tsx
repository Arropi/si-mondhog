import Link from "next/link";
import GraphicRAM from "./graphicRAM";
import GraphicHardisk from "./graphicHardisk";
import GraphicCPU from "./graphicCPU";
import DeviceInfoCardClient from "./DeviceSpecName";
import DeleteMachineButton from "./buttonDeleteClient";
import PerformanceSummaryClient from "./performanceSummary";
import LogDeviceActivityClient from "./logDeviceActivityClient";
import DropdownTimeSeries from "./dropdownTimeSeries";
import { TimeFilterProvider } from "../../features/timeFilterContext";

export default function DetailDevice({ deviceData }: { deviceData: any }) {
    const { machine, logs, metrics, highestStats } = deviceData;
    const status = machine.status || "Pending";
    const statusColor =
        status === "Online"
            ? "bg-green-100 text-green-700"
            : status === "Offline"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700";

    const hasNoMetrics = !metrics || metrics.length === 0;
    const isEmptyPending = status === "Pending" || (hasNoMetrics && status !== "Offline");
    const isOfflineNoData = status === "Offline" && hasNoMetrics;

    return (
        <TimeFilterProvider>
            <div className="w-full min-h-screen bg--background pb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 px-8">
                    <div className="text-sm font-medium text-gray-500 mb-4 md:mb-0">
                        <Link href="/devices" className="hover:text-gray-900">
                            All Devices
                        </Link>{" "}
                        /{" "}
                        <span className="text--secondary font-semibold truncate max-w-[250px] inline-block align-bottom">
                            {machine.hostname}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-[#6B46C1] hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-transparent shadow-sm">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                            Download CSV
                        </button>

                        <DropdownTimeSeries />
                    </div>
                </div>

                <div className="px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* kiri */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <DeviceInfoCardClient
                            machineId={machine._id}
                            currentHostname={machine.hostname}
                            currentOs={machine.os}
                            status={status}
                            statusColor={statusColor}
                        />

                        {isEmptyPending ? (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center h-[300px]">
                                <h3 className="text-gray-900 font-bold mb-2">Awaiting Connection</h3>
                                <p className="text-gray-500 text-sm">Please install the agent to start receiving logs and metrics.</p>
                            </div>
                        ) : isOfflineNoData ? (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center h-[300px]">
                                <h3 className="text-gray-900 font-bold mb-2">Device is Offline</h3>
                                <p className="text-gray-500 text-sm">No historical metrics are available for this device.</p>
                            </div>
                        ) : (
                            <>
                                <PerformanceSummaryClient
                                    deviceId={machine._id}
                                    initialData={{
                                        highestCpuUsage: highestStats?.length ? Math.round(highestStats[0].cpu) : 0,
                                        cpuChange: highestStats?.length && logs?.length ? Math.max(0, Math.round(highestStats[0].cpu - logs[0].cpuUsage)) : 0,
                                        highestRamUsage: highestStats?.length ? Math.round(highestStats[0].ram) : 0,
                                        ramChange: highestStats?.length && logs?.length ? Math.max(0, Math.round(highestStats[0].ram - logs[0].ramUsage)) : 0
                                    }}
                                />
                                <LogDeviceActivityClient deviceId={machine._id} initialData={logs || []} />
                            </>
                        )}

                        <div className="flex justify-end items-end">
                            <DeleteMachineButton
                                machineId={machine._id}
                                deviceName={machine.hostname}
                            />
                        </div>
                    </div>

                    {/* kanan */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {isEmptyPending ? (
                            <div className="bg-white rounded-2xl flex items-center justify-center p-6 shadow-sm border border-gray-50 h-[400px]">
                                <p className="text-gray-500 font-medium">Waiting for Agent connection...</p>
                            </div>
                        ) : isOfflineNoData ? (
                            <div className="bg-white rounded-2xl flex items-center justify-center p-6 shadow-sm border border-gray-50 h-[400px]">
                                <p className="text-gray-500 font-medium">Device is Offline (No stored metrics).</p>
                            </div>
                        ) : (
                            <>
                                <GraphicRAM dataMetrics={metrics} totalRam={machine.totalRam || 8} />
                                <GraphicHardisk dataMetrics={metrics} totalDisk={machine.totalDisk || 256} />
                                <GraphicCPU dataMetrics={metrics} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </TimeFilterProvider>
    );
}
