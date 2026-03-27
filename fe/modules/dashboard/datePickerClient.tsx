"use client";

import { cn } from "../../utils/cn";
import { useRouter } from "next/navigation";

export default function DatePickerClient({ selectedDate }: { selectedDate?: string }) {
    const router = useRouter();
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i)); // ini 6 hari laLU ke hari ini

        return {
            day: d.toLocaleDateString("en-US", {
                weekday: "long"
            }),
            date: d.getDate().toString(),
            fullDate: d.toISOString().split("T")[0] //YYYY-MM-DD
        };
    });

    const activeDate = selectedDate || dates[dates.length - 1].fullDate;
    const handleClick = (fullDate: string) => {
        router.push(`/dashboard?date=${fullDate}`, { scroll: false });
    }

    return (
        <div className="flex justify-between gap-3 overflow-x-auto pb-2 -mx-1 px-1 custom-scrollbar">
            {dates.map((item, idx) => (
                <div
                    key={idx}
                    onClick={() => handleClick(item.fullDate)}
                    className={cn(
                        "flex flex-col items-center justify-center min-w-[135px] h-[80px] rounded-[20px] cursor-pointer transition-all duration-300",
                        activeDate === item.fullDate
                            ? "bg-[#6B46C1] text-white shadow-md shadow-purple-200"
                            : "bg-white text-gray-400 border border-gray-100 hover:border-purple-200"
                    )}
                >
                    <span className={cn("text-[10px] font-bold tracking-wide uppercase mb-1", activeDate === item.fullDate ? "text-purple-200" : "")}>
                        {item.day}
                    </span>
                    <span className={cn("text-2xl font-black", activeDate === item.fullDate ? "text-white" : "text-gray-700")}>
                        {item.date}
                    </span>
                </div>
            ))}
        </div>
    );
}
