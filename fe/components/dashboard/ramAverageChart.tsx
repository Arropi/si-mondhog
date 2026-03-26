import RamAverageChartClient from "@/modules/dashboard/ramAverageChartClient";
import { formatDashboardMetrics } from "../../service/dashboardService";

export default async function RamAverageChart({ data }: { data: any[] }) {
  const chartData = await formatDashboardMetrics(data);
  return <RamAverageChartClient initialData={chartData} />;
}
