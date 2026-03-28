"use client";

import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ChartDataPoint } from "@/types";

export default function HarddiskAverageChartClient({ initialData }: { initialData: ChartDataPoint[] }) {
    const [data] = useState(initialData);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col h-[300px]">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-xl text-orange-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                    </div>
                    <h2 className="text-[13px] font-bold text-gray-900 tracking-wide">Harddisk Average</h2>
                </div>
                <div className="flex items-center gap-2 text-right">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest leading-none">
                        Space Used <span className="text-gray-900 ml-1 text-sm">184 GB</span>
                    </span>
                </div>
            </div>

            <div className="flex justify-end mb-1">
                <span className="text-[11px] font-bold text-gray-400 tracking-wide">
                    256 GB / <span className="text-red-500">72%</span>
                </span>
            </div>

            <div className="flex-1 w-full border border-gray-100 rounded-xl overflow-hidden relative bg-[#F8FAFC]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" hide={true} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#EF4444', fontWeight: 'bold' }}
                            labelStyle={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}
                            formatter={(value: any) => [`${Number(value).toFixed(2)}%`, "Usage"]}
                        />
                        <Area type="linear" dataKey="disk" stroke="#EF4444" fill="#FEE2E2" fillOpacity={0.6} strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between mt-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <span>7 Days</span>
                <span>0</span>
            </div>
        </div>
    );
}