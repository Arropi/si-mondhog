"use client";

import { useState } from "react";



import { useTimeFilter } from "../../features/timeFilterContext";

export default function DropdownTimeSeries() {
    const { timeFilter, setTimeFilter } = useTimeFilter();

    return (
        <div className="relative">
            <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm cursor-pointer"
            >
                <option value="Time Series">Time Series</option>
                <option value="12 Hours">12 Hours</option>
                <option value="1 Day">1 Day</option>
                <option value="3 Week">1 Week</option>
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
