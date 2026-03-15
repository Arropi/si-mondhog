import DetailDevice from "@/components/device/detailDevice/detailDevice";
import { getDeviceById } from "@/service/deviceService";
import { notFound } from "next/navigation";

export default async function DeviceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Mengambil data spesifik (device name & os) dari backend API berdasarkan ID 
  const machine = await getDeviceById(slug);

  if (!machine) {
    return notFound();
  }

  return <DetailDevice machine={machine} />;
}
