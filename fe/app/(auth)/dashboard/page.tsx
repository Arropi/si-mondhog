import DashboardPage from "@/modules/dashboard";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
    const { date } = await searchParams;
    return <DashboardPage date={date} />
}
