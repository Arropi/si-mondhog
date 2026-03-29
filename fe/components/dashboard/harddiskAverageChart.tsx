import HarddiskAverageChartClient from "@/modules/dashboard/harddiskAverageChartClient";
import { formatDashboardMetrics } from "../../service/dashboardService";
import { RawMetric } from "@/types";

export default async function HarddiskAverageChart({ data }: { data: RawMetric[] }) {
  const chartData = await formatDashboardMetrics(data);
  return <HarddiskAverageChartClient initialData={chartData} />;
}
