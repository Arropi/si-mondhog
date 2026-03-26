"use client";

import { useState } from "react";
import ButtonDownloadEvents from "./buttonDownload";

export default function LogsDeviceEventClient({ initialData }: { initialData: any[] }) {
    const [logs] = useState(initialData);

    return (
        <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[15px] font-bold text-[#FF0B5B] tracking-wide">Logs Device Events</h2>
                <div className="relative">
                    <ButtonDownloadEvents />
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <div className="min-w-[700px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-5 text-[12px] font-bold text-gray-800 border-b border-gray-100 pb-4 pt-2">
                        <div>Date</div>
                        <div>Name</div>
                        <div>Device Name</div>
                        <div>OS</div>
                        <div>Event</div>
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col">
                        {logs.map((log, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors py-4 items-center"
                            >
                                <div>{log.date}</div>
                                <div>{log.name}</div>
                                <div>{log.deviceName}</div>
                                <div>{log.os}</div>
                                <div>{log.event}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-5">
                <p className="col-start-5 text-xs text-gray-500">
                    *Download CSV File to see all data
                </p>
            </div>
        </div>
    );
}
