import { getDeviceById } from "@/service/deviceService";
import { notFound } from "next/navigation";
import DetailDevice from "../../../../modules/deviceDetail";

export default async function DeviceDetailPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ timeSeries?: string }>
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const timeSeries = resolvedSearchParams.timeSeries || '1h';

  const deviceData = await getDeviceById(slug, timeSeries);

  if (!deviceData || !deviceData.machine) {
    return notFound();
  }

  return <DetailDevice deviceData={deviceData} />;
}
