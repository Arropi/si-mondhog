"use client";

import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

// Data dummy sesuai dengan grafik pada gambar
const dummyRAM = [
  { name: "60", value: 80 }, { name: "55", value: 83 }, { name: "50", value: 81 },
  { name: "45", value: 84 }, { name: "40", value: 82 }, { name: "35", value: 81 },
  { name: "30", value: 80 }, { name: "25", value: 85 }, { name: "20", value: 86 },
  { name: "15", value: 84 }, { name: "10", value: 83 }, { name: "5", value: 81 },
  { name: "0", value: 80 },
];

export default function GraphicRAM() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h2 className="text-[13px] font-extrabold text-gray-900 tracking-wide">RAM Usage</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Active</span>
          </div>
          <div className="text-xl font-extrabold text-gray-900">8,0 GB</div>
        </div>
      </div>
      
      <div className="flex justify-end mb-2">
        <span className="text-[11px] font-bold text-gray-400 tracking-wide">7.4 GB / <span className="text-purple-600">86%</span></span>
      </div>
      
      <div className="w-full h-48 border border-gray-50 rounded-xl overflow-hidden flex items-end bg-[#FAFAFC] relative">
         <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={dummyRAM} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
               <Tooltip 
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 itemStyle={{ color: '#8B5CF6', fontWeight: 'bold' }}
                 labelStyle={{ color: '#9CA3AF', fontSize: '12px' }}
               />
               <Area type="monotone" dataKey="value" stroke="#8B5CF6" fill="#F3E8FF" strokeWidth={2} />
             </AreaChart>
         </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-3 text-[10px] text-gray-400 font-bold tracking-wide uppercase">
        <span>60 second</span>
        <span>0</span>
      </div>
    </div>
  );
}
