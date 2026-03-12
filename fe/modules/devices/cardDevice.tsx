"use client";

import { useEffect, useState } from "react";
import { DeviceCard } from "../../components/ui/cards";

interface Device {
    id: string;
    name: string;
    os: "windows" | "macOS" | "linux";
    status: "online" | "offline" | "pending";
}

export default function CardDevice({ query = "", status = "all" }: { query?: string, status?: string }) {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                setIsLoading(true);

                /*
                 * TODO: Ganti kode blok INI dengan pemanggilan fungsi HTTPS fetch asli ke backend:
                 * 
                 * const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices`);
                 * if (!response.ok) throw new Error("Gagal mengambil data perangkat");
                 * const data = await response.json();
                 * setDevices(data);
                 */

                // ==== HAPUS DATA SIMULASI INI SAAT BACKEND SUDAH SIAP ====
                await new Promise((resolve) => setTimeout(resolve, 800)); // Simulasi loading API
                const mockData: Device[] = [
                    { id: "1", name: "PC Lab 1", os: "windows", status: "online" },
                    { id: "2", name: "PC Lab 2", os: "macOS", status: "offline" },
                    { id: "3", name: "PC Lab 3", os: "windows", status: "online" },
                    { id: "4", name: "Mac Lab 1", os: "macOS", status: "online" },
                    { id: "5", name: "Mac Lab 2", os: "macOS", status: "online" },
                    { id: "6", name: "PC Lab 4", os: "windows", status: "offline" },
                    { id: "7", name: "Server Alpha", os: "linux", status: "pending" },
                    { id: "8", name: "Server Beta", os: "linux", status: "pending" },
                    { id: "9", name: "Server Gamma", os: "linux", status: "online" },
                    { id: "10", name: "Server Delta", os: "linux", status: "pending" },
                ];

                let filteredData = mockData;

                if (status && status !== "all") {
                    filteredData = filteredData.filter(d => d.status.toLowerCase() === status.toLowerCase());
                }

                if (query) {
                    const lowerQuery = query.toLowerCase();
                    filteredData = filteredData.filter(
                        (device) =>
                            device.name.toLowerCase().includes(lowerQuery) ||
                            device.os.toLowerCase().includes(lowerQuery)
                    );
                }

                setDevices(filteredData);
                // =========================================================

            } catch (error) {
                console.error("Terjadi kesalahan saat memuat data perangkat:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDevices();
    }, [query, status]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
                {/* Efek Loading Skeleton */}
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 animate-pulse h-56 w-full">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto" />
                        <div className="h-8 bg-gray-200 rounded-lg w-full mt-auto" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
            {devices.map((device) => (
                <DeviceCard
                    key={device.id}
                    name={device.name}
                    os={device.os}
                    status={device.status}
                />
            ))}
        </div>
    );
}
