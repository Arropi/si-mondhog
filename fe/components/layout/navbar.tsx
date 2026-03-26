"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "../../utils/cn";

const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 20);
    })

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Devices", href: "/devices" }
    ];

    return (
        <motion.nav className={cn("flex items-center bg-white justify-between px-8 py-4 border-b border-gray-200 shadow-md sticky top-0 z-50 transition-all duration-300 ease-in-out", isScrolled && "scale-90 px-12 rounded-4xl top-5 border border-gray-200 delay-100 bg-white/10 backdrop-blur-[1.5px]")}>
            <div className="flex items-center gap-20 delay-200">
                {/* Logo Icon */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/images/iconSymon.svg"
                        alt="Logo"
                        width={75}
                        height={75}
                    />
                </div>

                {/* Navbar rdirect */}
                <div className="hidden md:flex items-center gap-10">
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

            {/* Profile Section - Desktop */}
            <div className="hidden md:flex">
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
                                    {session?.user?.name?.charAt(0) ?? "U"}
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
            </div>

            {/* Hamburger Button - Mobile */}
            <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer focus:outline-none"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Dropdown Menu - Mobile */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg px-6 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? "max-h-[400px] opacity-100 py-4 mt-2 rounded-2xl" : "max-h-0 opacity-0 py-0 border-transparent"
                }`}>
                <div className="flex flex-col gap-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-base font-semibold py-2 border-b border-gray-100 last:border-0 ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    <div className="pt-2">
                        <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                                {session?.user?.image ? (
                                    <Image src={session.user.image} alt="Profile" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-600 font-bold">{session?.user?.name?.charAt(0) || "U"}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900">{session?.user?.name || "Loading..."}</span>
                                <span className="text-xs text-gray-500 font-medium">Lihat Profil</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
