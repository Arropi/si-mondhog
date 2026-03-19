"use client";

import { useEffect, useState } from "react";
import { DeviceCard } from "../../components/ui/cards";
import Image from "next/image";
import { getDeviceList, Device } from "../../service/deviceService";
import Pagination from "@/components/device/pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function CardDevice({ query = "", os = "all", initialPage = 1 }: { query?: string, os?: string, initialPage?: number }) {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 10;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = initialPage;

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                setIsLoading(true);

                const mappedDevices = await getDeviceList();

                let filteredData = mappedDevices;

                if (os && os !== "all") {
                    filteredData = filteredData.filter(d => d.os.toLowerCase() === os.toLowerCase());
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

            } catch (error) {
                console.error("Terjadi kesalahan saat memuat data perangkat:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDevices();
    }, [query, os]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const currentItems = devices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

    if (devices.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-16 mb-24">
                <Image
                    src="/images/iconNotFoundDevice.svg"
                    alt="Not Found"
                    width={100}
                    height={100}
                    className="object-contain"
                />
                <p className="text-black mt-6 font-light">Looking everywhere, but it’s not here...</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
                {currentItems.map((device) => (
                    <DeviceCard
                        key={device.id}
                        id={device.id}
                        name={device.name}
                        os={device.os}
                        status={device.status}
                    />
                ))}
            </div>

            {/* Pagination Section */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(devices.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </>
    );
}
