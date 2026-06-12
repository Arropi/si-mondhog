"use client";

import { useState } from "react";
import { DeviceStatsData } from "@/types";

export default function DeviceStatsClient({
  initialData,
}: {
  initialData: DeviceStatsData & { total: number };
}) {
  const [stats] = useState(initialData);

  return (
    <div id="dashboard-device-stats-card" className="flex flex-col gap-3">
      <h2
        id="dashboard-device-stats-title"
        className="text-sm font-bold text-[#FF0B5B] tracking-wide mb-1"
      >
        Device
      </h2>

      <div id="device-stats-total-card" className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="text-[10px] font-bold text-[#6B46C1] uppercase tracking-widest mb-1">
          TOTAL DEVICE
        </div>
        <div id="device-stats-total-value" className="text-2xl font-black text-gray-900">{stats.total}</div>
      </div>

      <div id="device-stats-online-card" className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="text-[10px] font-bold text-[#22C55E] uppercase tracking-widest mb-1">
          ONLINE
        </div>
        <div id="device-stats-online-value" className="text-2xl font-black text-gray-900">{stats.online}</div>
      </div>

      <div id="device-stats-offline-card" className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="text-[10px] font-bold text-[#FF0B5B] uppercase tracking-widest mb-1">
          OFFLINE
        </div>
        <div id="device-stats-offline-value" className="text-2xl font-black text-gray-900">{stats.offline}</div>
      </div>

      <div id="device-stats-pending-card" className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1">
          PENDING
        </div>
        <div id="device-stats-pending-value" className="text-2xl font-black text-gray-900">{stats.pending}</div>
      </div>
    </div>
  );
}
