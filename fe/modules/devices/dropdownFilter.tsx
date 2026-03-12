"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function DropdownFilter({ initialStatus = "all" }: { initialStatus?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = (status: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (status && status !== "all") {
            params.set("status", status);
        } else {
            params.delete("status");
        }
        // Update URL untuk fetching ulang data secara otomatis
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <select
            className="block w-full p-[9px] text-sm text-gray-500 border border-gray-200 rounded-xl bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none outline-none cursor-pointer"
            onChange={(e) => handleFilter(e.target.value)}
            defaultValue={initialStatus || searchParams.get("status")?.toString() || "all"}
        >
            <option value="all">All Devices</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="pending">Pending</option>
        </select>
    );
}
