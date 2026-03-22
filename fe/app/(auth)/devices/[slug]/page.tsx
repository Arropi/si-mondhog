import { getDeviceById } from "@/service/deviceService";
import { notFound } from "next/navigation";
import DetailDevice from "../../../../modules/deviceDetail";

export default async function DeviceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Mengambil data spesifik (device name & os) dari backend API berdasarkan ID 
  const machine = await getDeviceById(slug);

  if (!machine) {
    return notFound();
  }

  return <DetailDevice machine={machine} />;
}
