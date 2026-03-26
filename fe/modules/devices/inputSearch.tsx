"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

export default function InputSearch({ initialQuery = "" }: { initialQuery?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (term: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (term) {
                params.set("query", term);
            } else {
                params.delete("query");
            }
            // Update URL untuk fetching ulang data secara otomatis
            replace(`${pathname}?${params.toString()}`);
        }, 300);
    };

    return (
        <div className="relative flex flex-1 shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    id="search"
                    type="search"
                    className="block w-full py-[9px] pl-10 pr-4 text-sm text-gray-900 border border-gray-200 rounded-xl bg-white outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={initialQuery || searchParams.get("query")?.toString() || ""}
                />
            </div>
        </div>
    );
}