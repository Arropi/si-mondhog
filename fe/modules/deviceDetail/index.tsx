import Link from "next/link";
import GraphicRAM from "./graphicRAM";
import GraphicHardisk from "./graphicHardisk";
import GraphicCPU from "./graphicCPU";
import DeviceInfoCardClient from "./deviceSpecName";
import DeleteMachineButton from "./buttonDeleteClient";
import PerformanceSummaryClient from "./performanceSummary";
import LogDeviceActivityClient from "./logDeviceActivityClient";
import DropdownTimeSeries from "./dropdownTimeSeries";
import ButtonDownloadCsv from "./buttonDownloadCsv";
import Image from "next/image";
import { formatMetricsForChart } from "@/service/deviceService";
import { DeviceDetailData } from "@/types";

export default async function DetailDevice({ deviceData }: { deviceData: DeviceDetailData }) {
    const { machine, logs, metrics, highestStats } = deviceData;

    const chartData = await formatMetricsForChart(metrics);

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
        <div className="w-full min-h-screen bg--background pb-10 animate-fade-in">
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
                    <ButtonDownloadCsv machineId={machine._id} />

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
                            <Image
                                src="/images/offlinePendingIcon.svg"
                                width={50}
                                height={50}
                                alt="offline pending icon"
                            />
                            <p className="text-gray-500 text-lg mt-8">Device Pending</p>
                        </div>
                    ) : isOfflineNoData ? (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center h-[300px]">
                            <Image
                                src="/images/offlinePendingIcon.svg"
                                width={50}
                                height={50}
                                alt="offline pending icon"
                            />
                            <p className="text-gray-500 text-lg mt-8">Device Offline</p>
                        </div>
                    ) : (
                        <>
                            <PerformanceSummaryClient
                                deviceId={machine._id}
                                initialData={{
                                    highestCpuUsage: highestStats?.length ? Math.round(highestStats[0].cpu) : 0,
                                    cpuChange: highestStats?.length && logs?.length ? Math.max(0, Math.round(highestStats[0].cpu - logs[0].cpuUsage)) : 0,
                                    highestRamUsage: highestStats?.length ? Math.round(highestStats[0].ram) : 0,
                                    ramChange: highestStats?.length && logs?.length ? Math.max(0, Math.round(highestStats[0].ram - logs[0].ramUsage)) : 0,
                                    timestamp: metrics?.length ? metrics[0].timestamp : ""
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
                            <></>
                        </div>
                    ) : isOfflineNoData ? (
                        <div className="bg-white rounded-2xl flex items-center justify-center p-6 shadow-sm border border-gray-50 h-[400px]">
                            <></>
                        </div>
                    ) : (
                        <>
                            <GraphicRAM dataMetrics={chartData} totalRam={machine.totalRam || 8} />
                            <GraphicHardisk dataMetrics={chartData} totalDisk={machine.totalDisk || 256} />
                            <GraphicCPU dataMetrics={chartData} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
