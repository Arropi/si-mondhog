import CpuAverageChartClient from "@/modules/dashboard/cpuAverageChartClient";
import { formatDashboardMetrics } from "../../service/dashboardService";

// const DUMMY_CPU = [
//   { name: "60", value: 30 }, { name: "55", value: 45 }, { name: "50", value: 35 },
//   { name: "45", value: 65 }, { name: "40", value: 40 }, { name: "35", value: 50 },
//   { name: "30", value: 50 }, { name: "25", value: 40 }, { name: "20", value: 55 },
//   { name: "15", value: 45 }, { name: "10", value: 60 }, { name: "5", value: 50 },
//   { name: "0", value: 20 },
// ];

export default async function CpuAverageChart({ data }: { data: any[] }) {
  const chartData = await formatDashboardMetrics(data);

  return <CpuAverageChartClient initialData={chartData} />;
}
