"use client";

import { useState } from "react";
import { cn } from "../../utils/cn";

export default function DatePickerClient() {
    const dates = [
        { day: "Sunday", date: "13" },
        { day: "Monday", date: "14" },
        { day: "Tuesday", date: "15" },
        { day: "Wednesday", date: "16" },
        { day: "Thursday", date: "17" },
        { day: "Friday", date: "18" },
        { day: "Saturday", date: "19" },
    ];

    const [selectedIdx, setSelectedIdx] = useState(1);

    return (
        <div className="flex justify-between gap-3 overflow-x-auto pb-2 -mx-1 px-1 custom-scrollbar">
            {dates.map((item, idx) => (
                <div
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={cn(
                        "flex flex-col items-center justify-center min-w-[135px] h-[80px] rounded-[20px] cursor-pointer transition-all duration-300",
                        selectedIdx === idx
                            ? "bg-[#6B46C1] text-white shadow-md shadow-purple-200"
                            : "bg-white text-gray-400 border border-gray-100 hover:border-purple-200"
                    )}
                >
                    <span className={cn("text-[10px] font-bold tracking-wide uppercase mb-1", selectedIdx === idx ? "text-purple-200" : "")}>
                        {item.day}
                    </span>
                    <span className={cn("text-2xl font-black", selectedIdx === idx ? "text-white" : "text-gray-700")}>
                        {item.date}
                    </span>
                </div>
            ))}
        </div>
    );
}
