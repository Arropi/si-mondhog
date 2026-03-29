/** Data metric mentah dari backend /api/dashboard/summary */
export interface RawMetric {
    averageCpuUsage: number;
    averageRamUsage: number;
    averageDiskUsage: number;
    timestamp: string;
}

/** Data metric yang sudah diformat untuk chart Recharts */
export interface ChartDataPoint {
    name: string;
    cpu: number;
    ram: number;
    disk: number;
}

/** Peak performance dari backend */
export interface PeakMetrics {
    maxCpuUsage: number;
    maxRamUsage: number;
    maxDiskUsage: number;
    maxRam?: number;
    maxCpu?: number;
    maxDisk?: number;
}

/** Statistik device (online/offline/pending) */
export interface DeviceStatsData {
    online: number;
    offline: number;
    pending: number;
}

/** Log performa dari backend */
export interface PerformanceLog {
    formattedTimestamp: string;
    hostname: string;
    os: string;
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
}

/** Log event dari backend */
export interface EventLog {
    formattedTimestamp: string;
    hostname: string;
    os: string;
    action: string;
    name: string;
}

/** Response lengkap dari getDashboardSummary */
export interface DashboardSummary {
    metrics: RawMetric[];
    peak: PeakMetrics;
    stats: DeviceStatsData;
    total: number;
    logs: {
        performance: PerformanceLog[];
        events: EventLog[];
    };
}

/** Data machine dari backend */
export interface Machine {
    _id: string;
    hostname: string;
    os: string;
    status: string;
    totalRam: number;
    totalDisk: number;
    totalCpu: number;
    cpuModel: string;
    activationToken?: string;
    lastSeen?: string;
}

/** Data highest stats dari backend */
export interface HighestStats {
    cpu: number;
    ram: number;
    disk: number;
}

/** Log aktivitas device */
export interface DeviceActivityLog {
    formattedTimestamp: string;
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
}

/** Response lengkap dari getDeviceDetail */
export interface DeviceDetailData {
    machine: Machine;
    logs: DeviceActivityLog[];
    metrics: RawMetric[];
    highestStats: HighestStats[];
}

/** Props untuk Performance Summary */
export interface PerformanceSummaryData {
    highestCpuUsage: number;
    cpuChange: number;
    highestRamUsage: number;
    ramChange: number;
    timestamp: string;
}

/** Data formatting config for Peak Performance Client */
export interface PeakDataFormatted {
    ram: { used: number; total: number; percentage: number; unit: string; };
    cpu: { used: number; total: number; percentage: number; unit: string; };
    disk: { used: number; total: number; percentage: number; unit: string; };
}

export interface PerformanceLogFormatted {
    date: string;
    name: string;
    os: string;
    cpu: number;
    ram: number;
    disk: number;
    timestamp: string;
}

export interface EventLogFormatted {
    date: string;
    name: string;
    deviceName: string;
    os: string;
    event: string;
}
