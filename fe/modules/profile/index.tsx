"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import ButtonLogout from "./buttonLogout";
import ButtonAddAdmin from "./buttonAddAdmin";

interface ProfileProps {
    name: string;
    email: string;
    role: string;
}

export default function ProfilePage(profileProps: ProfileProps) {
    const { data: session, status } = useSession();

    const [profile, setProfile] = useState({
        name: profileProps.name ?? "",
        email: profileProps.email ?? "",
        role: profileProps.role ?? "",
    });

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setProfile((p) => ({
                ...p,
                name: session?.user?.name ?? p.name,
                email: session?.user?.email ?? p.email, // tanda ? cuma buat matiin error nya
                role: (session.user as any).role ?? p.role,
            }));
        }
    }, [status, session]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center text-black">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg--background p-4 lg:p-8 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Image
                        src="/images/profileIcon.svg"
                        alt="Profile Icon"
                        width={28}
                        height={28}
                    />
                    <h1 className="text-2xl font-bold text-gray-600 tracking-wide leading-none">Profile</h1>
                </div>

                <div className="flex gap-4">
                    {profile.role === "admin" && <ButtonAddAdmin />}
                    <ButtonLogout />
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-4 px-4 lg:px-0">
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-[140px] h-[140px] rounded-full overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.05)] border-2 border-gray-100">
                        {session?.user?.image ? (
                            <Image
                                src={session.user.image}
                                alt="profile"
                                width={160}
                                height={160}
                                className="object-cover w-full h-full"
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-4xl font-black text-gray-400 uppercase">
                                    {profile.name?.charAt(0) ?? "U"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100 mt-10">
                    <h2 className="text-[17px] font-bold text-[#FF0B5B] tracking-wide mb-6 border-b border-gray-100 pb-4">
                        Detail Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12">
                        <div className="flex flex-col gap-8">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Name</p>
                                <p className="text-gray-800 font-bold">
                                    {profile.name || "Unknown User"}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm mb-1">Email</p>
                                <p className="text-gray-800 font-bold line-clamp-2">{profile.email}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Role</p>
                                <p className="text-gray-800 font-bold">
                                    {profile.role || (
                                        <span className="text-gray-400 italic">Not provided</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
