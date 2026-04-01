"use client";

import { useSession } from "next-auth/react";
import { downloadCsvClient } from "../../lib/csvClient";

export default function ButtonDownloadCsv({ machineId }: { machineId: string }) {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    const handleDownload = async () => {
        const token = (session?.user as any)?.accessToken;
        if (!token) return alert("Session not found. Please relogin.");

        try {
            const blob = await downloadCsvClient(machineId, token);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${machineId}_metrics.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error(error);
            alert("Gagal mengunduh CSV");
        }
    };

    if (!isAdmin) return null;

    return (
        <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-[#6B46C1] hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-transparent shadow-sm cursor-pointer"
        >
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
            </svg>
            Download CSV
        </button>
    );
}
