import RamAverageChartClient from "@/modules/dashboard/ramAverageChartClient";

const DUMMY_RAM = [
  { name: "60", value: 70 }, { name: "55", value: 75 }, { name: "50", value: 72 },
  { name: "45", value: 80 }, { name: "40", value: 85 }, { name: "35", value: 82 },
  { name: "30", value: 88 }, { name: "25", value: 90 }, { name: "20", value: 85 },
  { name: "15", value: 88 }, { name: "10", value: 95 }, { name: "5", value: 92 },
  { name: "0", value: 90 },
];

export default async function RamAverageChart() {
    return <RamAverageChartClient initialData={DUMMY_RAM} />;
}
