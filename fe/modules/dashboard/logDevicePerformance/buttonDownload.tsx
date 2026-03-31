"use client";

import { useState } from "react";
import { downloadDashboardCsv } from "@/service/dashboardService";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ButtonDownloadPerformance() {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    const handleDownload = async () => {
        setLoading(true);
        try {
            const date = searchParams.get("date") || undefined;
            const csvText = await downloadDashboardCsv("performance", date);

            if (!csvText) {
                alert("Gagal mengunduh CSV");
                return;
            }

            const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `logs-performance-${date || "7days"}.csv`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            alert("Terjadi kesalahan saat mengunduh CSV");
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) return null;

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center gap-2 bg--primary hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-transparent shadow-sm cursor-pointer"
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
            {loading ? "Downloading..." : "Download CSV"}
        </button>
    );
}
