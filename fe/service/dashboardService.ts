"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import type { RawMetric, ChartDataPoint, DashboardSummary } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";

export async function getDashboardSummary(date?: string): Promise<DashboardSummary | null> {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;
        const url = date ? `${API_BASE_URL}/dashboard/summary?date=${date}` : `${API_BASE_URL}/dashboard/summary`;

        const response = await fetch(url, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) throw new Error("Failed to fetch dashboard summary");

        const data = await response.json();
        return data.datas;
    } catch (error) {
        console.error("Dashboard Service Error:", error);
        return null;
    }
}

export async function formatDashboardMetrics(metrics: RawMetric[]): Promise<ChartDataPoint[]> {
    if (!metrics) return [];
    return [...metrics].reverse().map(m => ({
        name: m.timestamp.substring(0, 16),
        cpu: Number(m.averageCpuUsage || 0),
        ram: Number(m.averageRamUsage || 0),
        disk: Number(m.averageDiskUsage || 0),
    }));
}

export async function downloadDashboardCsv(type: "performance" | "events", date?: string) {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;

        const url = date
            ? `${API_BASE_URL}/csv/download/logs/${type}?date=${date}`
            : `${API_BASE_URL}/csv/download/logs/${type}`;

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) return null;

        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Download CSV Error:", error);
        return null;
    }
}