"use client"

import { useEffect, useState } from "react"
import { getPerformanceData } from "../../service/deviceService";

interface PerformanceSummaryProps {
    deviceId: string;
    initialData: any;
}

export default function PerformanceSummaryClient({
    deviceId,
    initialData
    }: PerformanceSummaryProps) {

    const [data, setData] = useState(initialData); // data akan disimpann di initial data dulu agar tidak memerlukan waktu untuk menampilkannya

    useEffect(() => {
        const updateStats = async () => {
            const result = await getPerformanceData(deviceId);

            if (result) {
                setData(result);
            }
        };

        const interval = setInterval(updateStats, 5000);

        return () => clearInterval(interval);
    }, [deviceId]);

    return (
        <>
            <div className="bg-transparent mt-2">
                <h2 className="text-[13px] font-bold text-gray-800 tracking-wide mb-3 px-1">
                    Performance Summary
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
                        <div className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide">
                            Highest CPU Usage
                        </div>
                        <div className="flex items-end gap-2">
                            <div className="text-2xl font-extrabold text-gray-900">
                                {data.highestCpuUsage}
                            </div>
                            <div className="text-[11px] font-bold text-green-500 mb-1 tracking-wide">
                                +{data.cpuChange}%
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
                        <div className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide">
                            Highest RAM Usage
                        </div>
                        <div className="flex items-end gap-2">
                            <div className="text-2xl font-extrabold text-gray-900">
                                {data.highestRamUsage}
                            </div>
                            <div className="text-[11px] font-bold text-green-500 mb-1 tracking-wide">
                                +{data.ramChange}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}