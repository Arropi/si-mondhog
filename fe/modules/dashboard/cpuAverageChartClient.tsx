"use client";

import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

export default function CpuAverageChartClient({ initialData }: { initialData: any[] }) {
    const [data] = useState(initialData);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col h-[300px]">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-lime-50 rounded-xl text-lime-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h2 className="text-[13px] font-extrabold text-gray-900 tracking-wide">CPU Usage</h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-lime-500"></span>
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Load Avg</span>
                </div>
            </div>

            <div className="flex justify-end mb-1">
                <span className="text-[11px] font-bold text-gray-400 tracking-wide">100%</span>
            </div>

            <div className="flex-1 w-full border border-gray-100 rounded-xl overflow-hidden relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#84CC16', fontWeight: 'bold' }}
                            labelStyle={{ color: '#9CA3AF', fontSize: '12px' }}
                        />
                        <Area type="linear" dataKey="value" stroke="#84CC16" fill="#ECFCCB" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between mt-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <span>60 second</span>
                <span>0</span>
            </div>
        </div>
    );
}
