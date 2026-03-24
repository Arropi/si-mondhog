"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TimeFilterContextType {
    timeFilter: string;
    setTimeFilter: (val: string) => void;
}

const TimeFilterContext = createContext<TimeFilterContextType | undefined>(undefined);

export function TimeFilterProvider({ children }: { children: ReactNode }) {
    const [timeFilter, setTimeFilter] = useState("Time Series");
    return (
        <TimeFilterContext.Provider value={{ timeFilter, setTimeFilter }}>
            {children}
        </TimeFilterContext.Provider>
    );
}

export function useTimeFilter() {
    const context = useContext(TimeFilterContext);
    if (context === undefined) {
        throw new Error("useTimeFilter must be used within a TimeFilterProvider");
    }
    return context;
}

export function filterMetricsByTime(metrics: any[], timeFilter: string) {
    if (!metrics || metrics.length === 0) return [];

    if (timeFilter === "Time Series") {
        return metrics;
    }
    if (timeFilter === "3 Week" || timeFilter === "1 Week") {
        if (metrics.length <= 2) return metrics;
        return [metrics[0], metrics[metrics.length - 1]];
    }

    let bucketMs = 0;
    if (timeFilter === "12 Hours") {
        bucketMs = 12 * 60 * 60 * 1000;
    } else if (timeFilter === "1 Day") {
        bucketMs = 24 * 60 * 60 * 1000;
    }

    if (bucketMs === 0) return metrics;

    const firstMetricTime = new Date(metrics[0].timestamp.replace(" ", "T")).getTime();
    const buckets: Record<number, any[]> = {};

    metrics.forEach((m: any) => {
        const mTime = new Date(m.timestamp.replace(" ", "T")).getTime();
        const bucketIndex = Math.floor((mTime - firstMetricTime) / bucketMs);
        
        if (!buckets[bucketIndex]) {
            buckets[bucketIndex] = [];
        }
        buckets[bucketIndex].push(m);
    });

    const aggregatedMetrics = Object.keys(buckets)
        .sort((a, b) => Number(a) - Number(b))
        .map(bucketIndex => {
            const items = buckets[Number(bucketIndex)];
            const sumCpu = items.reduce((acc, curr) => acc + (curr.averageCpuUsage || 0), 0);
            const sumRam = items.reduce((acc, curr) => acc + (curr.averageRamUsage || 0), 0);
            const sumDisk = items.reduce((acc, curr) => acc + (curr.averageDiskUsage || 0), 0);
            
            return {
                ...items[0], 
                averageCpuUsage: sumCpu / items.length,
                averageRamUsage: sumRam / items.length,
                averageDiskUsage: sumDisk / items.length,
            };
        });

    return aggregatedMetrics;
}
