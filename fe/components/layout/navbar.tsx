"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();

    const navLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Devices", href: "/devices" },
        { name: "Logs", href: "/logs" },
    ];

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center gap-12">
                {/* Logo Icon */}
                <div className="flex items-center gap-3">
                    <div className="text-red-500 border border-gray-200 bg-white p-1 rounded-md shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">SiMondok</span>
                </div>

                {/* Navbar rdirect */}
                <div className="flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-semibold transition-colors duration-200 ${isActive
                                    ? "text-gray-900"
                                    : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Profile Section */}
            <Link
                href="/profile"
                className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 -my-2 rounded-xl transition-colors cursor-pointer"
            >
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm shrink-0">
                    {session?.user?.image ? (
                        <Image
                            src={session.user.image}
                            alt="profile"
                            width={40}
                            height={40}
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <span className="text-3xl font-medium text-gray-500">
                                {session?.user.name?.charAt(0) ?? "U"}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 leading-tight">
                        {session?.user?.name || "Loading..."}
                    </span>
                    <span className="text-xs text-gray-500 font-medium leading-tight">
                        {((session?.user as any)?.role) || "User"}
                    </span>
                </div>
            </Link>
        </nav>
    );
};

export default Navbar;
