"use client";

import { useState } from "react";
import { EventLogFormatted } from "@/types";
import ButtonDownloadEvents from "./buttonDownload";

export default function LogsDeviceEventClient({
  initialData,
}: {
  initialData: EventLogFormatted[];
}) {
  const [logs] = useState(initialData);

  return (
    <div
      id="dashboard-event-logs-card"
      className="bg-white rounded-[24px] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100"
    >
      <div
        id="dashboard-event-logs-header"
        className="flex justify-between items-center mb-6"
      >
        <h2
          id="dashboard-event-logs-title"
          className="text-[15px] font-bold text-[#FF0B5B] tracking-wide"
        >
          Logs Device Events
        </h2>
        <div id="dashboard-event-logs-download" className="relative">
          <ButtonDownloadEvents />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div id="event-logs-table" className="min-w-[700px]">
          {/* Table Header */}
          <div id="event-logs-table-header" className="grid grid-cols-5 text-[12px] font-bold text-gray-800 border-b border-gray-100 pb-4 pt-2">
            <div>Date</div>
            <div>Name</div>
            <div>Device Name</div>
            <div>OS</div>
            <div>Event</div>
          </div>

          {/* Table Body */}
          <div id="event-logs-table-body" className="flex flex-col">
            {logs.map((log, idx) => (
              <div
                key={idx}
                id={`event-log-row-${idx}`}
                className="grid grid-cols-5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors py-4 items-center"
              >
                <div>{log.date}</div>
                <div className="max-w-[100px] truncate">{log.name}</div>
                <div className="max-w-[100px] truncate">{log.deviceName}</div>
                <div className="max-w-[100px] truncate">{log.os}</div>
                <div className="max-w-[100px] truncate">{log.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-5">
        <p id="event-logs-note" className="col-start-5 text-xs text-gray-500">
          *Download CSV File to see all data
        </p>
      </div>
    </div>
  );
}
