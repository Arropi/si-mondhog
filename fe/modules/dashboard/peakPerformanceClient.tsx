"use client";

import { useState } from "react";
import { PeakDataFormatted } from "@/types";

export default function PeakPerformanceClient({ initialData }: { initialData: PeakDataFormatted }) {
    const [data] = useState(initialData);

    const getColor = (percentage: number) => {
        if (percentage < 60) return "#22C55E"; // Green
        if (percentage < 85) return "#F59E0B"; // Orange
        return "#FF0B5B"; // Red/Pink
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-sm font-extrabold text-[#FF0B5B] tracking-wide mb-1 uppercase">Peak Performance</h2>

            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5">
                <div className="flex items-center justify-between font-black uppercase text-[10px] text-gray-400">
                    Peak RAM
                </div>
                <div className="flex items-center justify-between -mt-4">
                    <div className="text-2xl font-black text-gray-900 tracking-tight">
                        {data.ram.used}/{data.ram.total} <span className="text-gray-400 text-sm font-bold">{data.ram.unit}</span>
                    </div>
                    <div className="text-5xl font-black transition-colors duration-500" style={{ color: getColor(data.ram.percentage) }}>
                        {data.ram.percentage}%
                    </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-auto">
                    <div
                        className="h-full transition-all duration-700 ease-out rounded-full"
                        style={{
                            width: `${data.ram.percentage}%`,
                            backgroundColor: getColor(data.ram.percentage)
                        }}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5">
                <div className="flex items-center justify-between font-black uppercase text-[10px] text-gray-400">
                    Peak CPU
                </div>
                <div className="flex items-center justify-between -mt-4">
                    <div className="text-2xl font-black text-gray-900 tracking-tight">
                        {data.cpu.used}/{data.cpu.total} <span className="text-gray-400 text-sm font-bold">{data.cpu.unit}</span>
                    </div>
                    <div className="text-5xl font-black transition-colors duration-500" style={{ color: getColor(data.cpu.percentage) }}>
                        {data.cpu.percentage}%
                    </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-auto">
                    <div
                        className="h-full transition-all duration-700 ease-out rounded-full"
                        style={{
                            width: `${data.cpu.percentage}%`,
                            backgroundColor: getColor(data.cpu.percentage)
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

