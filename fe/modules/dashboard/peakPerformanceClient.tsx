"use client";

import { useState } from "react";
import { PeakDataFormatted } from "@/types";

export default function PeakPerformanceClient({
  initialData,
}: {
  initialData: PeakDataFormatted;
}) {
  const [data] = useState(initialData);

  const getColor = (percentage: number) => {
    if (percentage < 60) return "#22C55E"; // Green
    if (percentage < 85) return "#F59E0B"; // Orange
    return "#FF0B5B"; // Red/Pink
  };

  return (
    <div id="dashboard-peak-performance-card" className="flex flex-col gap-4">
      <div id="peak-ram-card" className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5">
        <div id="peak-ram-title" className="flex items-center justify-between font-black uppercase text-[10px] text-gray-400">
          Peak RAM
        </div>
        <div className="flex items-center justify-between -mt-4">
          <div id="peak-ram-value" className="text-2xl font-black text-gray-900 tracking-tight">
            {data.ram.used.toFixed(1)}/{data.ram.total.toFixed(1)}{" "}
            <span className="text-gray-400 text-sm font-bold">
              {data.ram.unit}
            </span>
          </div>
          <div
            id="peak-ram-percentage"
            className="text-5xl font-black transition-colors duration-500"
            style={{ color: getColor(data.ram.percentage) }}
          >
            {Math.round(data.ram.percentage)}%
          </div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-auto">
          <div
            id="peak-ram-progressbar"
            className="h-full transition-all duration-700 ease-out rounded-full"
            style={{
              width: `${data.ram.percentage}%`,
              backgroundColor: getColor(data.ram.percentage),
            }}
          />
        </div>
      </div>

      <div id="peak-cpu-card" className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5">
        <div id="peak-cpu-title" className="flex items-center justify-between font-black uppercase text-[10px] text-gray-400">
          Peak CPU
        </div>
        <div className="flex items-center justify-between -mt-4">
          <div id="peak-cpu-value" className="text-2xl font-black text-gray-900 tracking-tight">
            {data.cpu.used.toFixed(1)}/{data.cpu.total.toFixed(1)}{" "}
            <span className="text-gray-400 text-sm font-bold">
              {data.cpu.unit}
            </span>
          </div>
          <div
            id="peak-cpu-percentage"
            className="text-5xl font-black transition-colors duration-500"
            style={{ color: getColor(data.cpu.percentage) }}
          >
            {Math.round(data.cpu.percentage)}%
          </div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-auto">
          <div
            id="peak-cpu-progressbar"
            className="h-full transition-all duration-700 ease-out rounded-full"
            style={{
              width: `${data.cpu.percentage}%`,
              backgroundColor: getColor(data.cpu.percentage),
            }}
          />
        </div>
      </div>

      <div id="peak-disk-card" className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5">
        <div id="peak-disk-title" className="flex items-center justify-between font-black uppercase text-[10px] text-gray-400">
          Peak Disk
        </div>
        <div className="flex items-center justify-between -mt-4">
          <div id="peak-disk-value" className="text-2xl font-black text-gray-900 tracking-tight">
            {data.disk.used.toFixed(1)}/{data.disk.total.toFixed(1)}{" "}
            <span className="text-gray-400 text-sm font-bold">
              {data.disk.unit}
            </span>
          </div>
          <div
            id="peak-disk-percentage"
            className="text-5xl font-black transition-colors duration-500"
            style={{ color: getColor(data.disk.percentage) }}
          >
            {Math.round(data.disk.percentage)}%
          </div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-auto">
          <div
            id="peak-disk-progressbar"
            className="h-full transition-all duration-700 ease-out rounded-full"
            style={{
              width: `${data.disk.percentage}%`,
              backgroundColor: getColor(data.disk.percentage),
            }}
          />
        </div>
      </div>
    </div>
  );
}
