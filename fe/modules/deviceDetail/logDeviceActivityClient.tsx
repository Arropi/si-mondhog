"use client";

import { useEffect, useState } from "react";
import { DeviceActivityLog } from "@/types";

interface LogDeviceActivityProps {
    deviceId: string;
    initialData: DeviceActivityLog[];
}

export default function LogDeviceActivityClient({ deviceId, initialData }: LogDeviceActivityProps) {
    const [logs, setLogs] = useState(initialData);

    useEffect(() => {
        setLogs(initialData);
    }, [initialData]);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col mt-2">
            <h2 className="text-[13px] font-extrabold text-purple-700 tracking-wide mb-5">
                Log Device Activity
            </h2>

            <div className="flex-1">
                <div className="grid grid-cols-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-50 pb-3">
                    <div>CPU</div>
                    <div>RAM</div>
                    <div>Harddisk</div>
                    <div>Timestamp</div>
                </div>

                {logs.length > 0 ? (
                    logs.map((log: DeviceActivityLog, i: number) => (
                        <div
                            key={i}
                            className="grid grid-cols-4 text-[12px] font-medium text-gray-500 mb-4 last:mb-0 hover:text-gray-800 transition-colors"
                        >
                            <div>{log.cpuUsage ? Math.round(log.cpuUsage) : "-"}%</div>
                            <div>{log.ramUsage ? Math.round(log.ramUsage) : "-"}%</div>
                            <div>{log.diskUsage ? Math.round(log.diskUsage) : "-"}%</div>
                            <div suppressHydrationWarning>{log.formattedTimestamp || "-"}</div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 text-xs py-4">
                        No activity logs found.
                    </div>
                )}
            </div>
        </div>
    );
}