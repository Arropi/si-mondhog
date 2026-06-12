import RamAverageChartClient from "@/modules/dashboard/ramAverageChartClient";
import { formatDashboardMetrics } from "../../service/dashboardService";
import type { RawMetric } from "@/types";

export default async function RamAverageChart({ data }: { data: RawMetric[] }) {
  const chartData = await formatDashboardMetrics(data);
  return (
    <div id="dashboard-ram-chart-server">
      <RamAverageChartClient initialData={chartData} />
    </div>
  );
}
