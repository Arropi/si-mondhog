"use client";

import { useState } from "react";

export default function DeviceStatsClient({ initialData }: { initialData: any }) {
    const [stats] = useState(initialData);

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-[#FF0B5B] tracking-wide mb-1">Device</h2>

            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="text-[10px] font-bold text-[#6B46C1] uppercase tracking-widest mb-1">TOTAL DEVICE</div>
                <div className="text-2xl font-black text-gray-900">{stats.total}</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="text-[10px] font-bold text-[#22C55E] uppercase tracking-widest mb-1">ONLINE</div>
                <div className="text-2xl font-black text-gray-900">{stats.online}</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="text-[10px] font-bold text-[#FF0B5B] uppercase tracking-widest mb-1">OFFLINE</div>
                <div className="text-2xl font-black text-gray-900">{stats.offline}</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1">PENDING</div>
                <div className="text-2xl font-black text-gray-900">{stats.pending}</div>
            </div>
        </div>
    );
}
