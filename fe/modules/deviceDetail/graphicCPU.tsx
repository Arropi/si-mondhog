"use client";

import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";import { ChartDataPoint } from "@/types";
export default function GraphicCPU({ dataMetrics }: { dataMetrics: ChartDataPoint[] }) {
  const lastValue = dataMetrics.length > 0 ? Number(dataMetrics[dataMetrics.length - 1].cpu.toFixed(2)) : 0;
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-lime-50 rounded-xl text-lime-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-[13px] font-extrabold text-gray-900 tracking-wide">CPU Usage</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-500"></span>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Usage</span>
          </div>
          <div className="text-xl font-extrabold text-gray-900">{lastValue}%</div>
        </div>
      </div>

      <div className="flex justify-end mb-2">
        <span className="text-[11px] font-bold text-gray-400 tracking-wide">100% / <span className="text-lime-600">{lastValue}%</span></span>
      </div>

      <div className="w-full h-48 border border-gray-50 rounded-xl overflow-hidden flex items-end bg-[#FAFAFC] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataMetrics} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" hide={true} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#84CC16', fontWeight: 'bold' }}
              labelStyle={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}
              formatter={(value: any) => [`${Number(value).toFixed(2)}%`, "Usage"]}
            />
            <Area type="linear" dataKey="cpu" stroke="#84CC16" fill="#ECFCCB" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-3 text-[10px] text-gray-400 font-bold tracking-wide uppercase">
        <span suppressHydrationWarning>{dataMetrics.length > 0 ? dataMetrics[0].name : "N/A"}</span>
        <span suppressHydrationWarning>{dataMetrics.length > 0 ? dataMetrics[dataMetrics.length - 1].name : "NOW"}</span>
      </div>
    </div>
  );
}
