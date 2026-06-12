import DashboardPage from "@/modules/dashboard";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  return (
    <div id="dashboard-route">
      <DashboardPage date={date} />
    </div>
  );
}
