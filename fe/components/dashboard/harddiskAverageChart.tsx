import HarddiskAverageChartClient from "@/modules/dashboard/harddiskAverageChartClient";
import { formatDashboardMetrics } from "../../service/dashboardService";

export default async function HarddiskAverageChart({ data }: { data: any[] }) {
  const chartData = await formatDashboardMetrics(data);
  return <HarddiskAverageChartClient initialData={chartData} />;
}
