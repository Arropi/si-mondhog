"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function DropdownTimeSeries() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const timeSeries = searchParams.get("timeSeries") || "1h";

    const handleChange = (val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("timeSeries", val);
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="relative">
            <select
                value={timeSeries}
                onChange={(e) => handleChange(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm cursor-pointer"
            >
                <option value="1h">1 Hours</option>
                <option value="12h">12 Hours</option>
                <option value="1d">1 Day</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    );
}
