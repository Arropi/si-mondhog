"use client";

import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ChartDataPoint } from "@/types";

export default function RamAverageChartClient({ initialData }: { initialData: ChartDataPoint[] }) {
    const [data, setData] = useState(initialData);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col h-[300px]">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                    </div>
                    <h2 className="text-[13px] font-bold text-gray-900 tracking-wide">RAM Average</h2>
                </div>
                <div className="flex items-center gap-2 text-right">
                    <span className="w-2 h-2 rounded-full bg-[#6B46C1]"></span>
                    <span className="text-[10px] text-[#6B46C1] font-bold uppercase tracking-widest leading-none">
                        Active <span className="text-gray-900 ml-1 text-sm">8,0 GB</span>
                    </span>
                </div>
            </div>

            <div className="flex justify-end mb-1">
                <span className="text-[11px] font-bold text-gray-400 tracking-wide">
                    7.4 GB / <span className="text-[#6B46C1]">86%</span>
                </span>
            </div>

            <div className="flex-1 w-full border border-gray-100 rounded-xl overflow-hidden relative bg-[#F8FAFC]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" hide={true} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#6B46C1', fontWeight: 'bold' }}
                            labelStyle={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}
                            formatter={(value: any) => [`${Number(value).toFixed(2)}%`, "Usage"]}
                        />
                        <Area type="linear" dataKey="ram" stroke="#6B46C1" fill="#F3E8FF" fillOpacity={0.6} strokeWidth={2} />
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
