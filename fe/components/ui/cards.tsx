"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import Image from "next/image";
import Link from "next/link"; // Import Link dari Next.js

const statusVariants = cva(
    "w-full py-2 px-4 rounded-full text-center text-xs md:text-sm font-semibold transition-colors mt-6 uppercase tracking-wider group cursor-pointer border border-transparent hover:bg-white duration-300",
    {
        variants: {
            status: {
                online: "bg-green-200 text-green-700 hover:border-green-700",
                offline: "bg-red-300 text-red-800 hover:border-red-800",
                pending: "bg-yellow-200 text-yellow-700 hover:border-yellow-700",
            },
        },
        defaultVariants: {
            status: "online",
        },
    }
);

export interface DeviceCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusVariants> {
    id: string; // Tambahkan ID untuk routing
    name: string;
    os: "windows" | "macOS" | "linux";
    status: "online" | "offline" | "pending";
}

const OsIcons = {
    windows: (
        <Image
            src="/images/windows.svg"
            alt="Windows"
            width={54}
            height={54}
        />
    ),
    macOS: (
        <Image
            src="/images/mac.svg"
            alt="mac"
            width={54}
            height={54}
        />
    ),
    linux: (
        <Image
            src="/images/linux.svg"
            alt="Linux"
            width={54}
            height={54}
        />
    )
}

export function DeviceCard({ id, name, os, status, className, ...props }: DeviceCardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-between gap-2 md:gap-3 w-full",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-center flex-1 w-full min-h-[5rem] md:min-h-[6rem]">
                {OsIcons[os]}
            </div>

            <div className="flex flex-col items-center gap-1 w-full text-center mt-2">
                <h3 className="text-base md:text-lg font-bold text-gray-900 truncate w-full">{name}</h3>
                <span className="text-xs md:text-sm text-gray-500 font-medium capitalize">{os === "macOS" ? "MacOS" : os}</span>
            </div>

            <Link href={`/devices/${id}`} className={cn(statusVariants({ status }), "block")}>
                <span className="block group-hover:hidden">
                    {status}
                </span>
                <span className="hidden group-hover:block font-bold !normal-case capitalize duration-300 transition-all">
                    View Detail &rarr;
                </span>
            </Link>
        </div>
    )
}