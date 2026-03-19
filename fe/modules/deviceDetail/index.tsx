import Link from "next/link";
import GraphicRAM from "./graphicRAM";
import GraphicHardisk from "./graphicHardisk";
import GraphicCPU from "./graphicCPU";
import DeviceInfoCardClient from "./DeviceSpecName";
import DeleteMachineButton from "./buttonDeleteClient";
import PerformanceSummary from "../../components/detailDevice/performanceSummary";
import LogDeviceActivity from "../../components/detailDevice/logDeviceActivity";

export default function DetailDevice({ machine }: { machine: any }) {
    // Mapping fallback jika tidak terdapat field status
    const status = machine.status ? machine.status.toUpperCase() : "PENDING";
    const statusColor =
        status === "ONLINE"
            ? "bg-green-100 text-green-700"
            : status === "OFFLINE"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700";

    return (
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

                    <div className="relative">
                        <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm cursor-pointer">
                            <option>12 Hours</option>
                            <option>24 Hours</option>
                            <option>3 Days</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
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
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
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

                    <PerformanceSummary deviceId={machine._id} />

                    <LogDeviceActivity deviceId={machine._id} />
                    <div className="flex justify-end items-end">
                        <DeleteMachineButton
                            machineId={machine._id}
                            deviceName={machine.hostname}
                        />
                    </div>
                </div>

                {/* kanan */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* bikin server side dari ke 3 grafik nya di folder components */}
                    <GraphicRAM />
                    <GraphicHardisk />
                    <GraphicCPU />
                </div>
            </div>
        </div>
    );
}
