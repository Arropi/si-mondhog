import { getDeviceById } from "@/service/deviceService";
import { notFound } from "next/navigation";
import DetailDevice from "../../../../modules/deviceDetail";

export default async function DeviceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const deviceData = await getDeviceById(slug);

  if (!deviceData || !deviceData.machine) {
    return notFound();
  }

  return <DetailDevice deviceData={deviceData} />;
}
