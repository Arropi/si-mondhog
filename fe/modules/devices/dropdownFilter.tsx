"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function DropdownFilter({ initialOs = "all" }: { initialOs?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = (osValue: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (osValue && osValue !== "all") {
            params.set("os", osValue);
        } else {
            params.delete("os");
        }
        
        // Reset ke halaman 1 setiap kali filter berubah
        params.set("page", "1");
        
        // Update URL untuk fetching ulang data secara otomatis
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <select
            className="block w-full p-[9px] text-sm text-gray-500 border border-gray-200 rounded-xl bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none outline-none cursor-pointer"
            onChange={(e) => handleFilter(e.target.value)}
            defaultValue={initialOs || searchParams.get("os")?.toString() || "all"}
        >
            <option value="all">All Devices</option>
            <option value="Windows">Windows</option>
            <option value="macOS">macOS</option>
            <option value="Linux">Linux</option>
        </select>
    );
}
