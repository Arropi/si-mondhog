"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import AddAdminModal from "../../components/ui/addAdminModal";
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

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
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
        <div className="min-h-screen pb-10 animate-fade-in">
            {showLogoutModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 transition-opacity">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center gap-8 transform transition-transform">
                        <h3 className="text-xl font-bold text-black text-center mt-4">
                            Are you sure want to Log Out??
                        </h3>

                        <div className="flex items-center gap-8 mb-2 w-full justify-center">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-8 py-2.5 rounded-2xl border-2 border-pink-500 text-black font-bold hover:bg-pink-50 transition-colors cursor-pointer"
                            >
                                No
                            </button>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="px-8 py-2.5 rounded-2xl bg--primary text-white font-bold hover:bg-[#7c3aed] transition-colors cursor-pointer"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AddAdminModal isOpen={showAddAdminModal} onClose={() => setShowAddAdminModal(false)} />

            <div className="flex items-center mt-6 lg:mt-10 px-4 lg:px-10 gap-3">
                <Image
                    src="/images/profileIcon.svg"
                    alt="Profile Icon"
                    width={28}
                    height={28}
                />
                <h2 className="text-2xl font-bold text-black">Profile</h2>

                <div className="ml-auto flex gap-4">
                    {profile.role === "admin" && (
                        <button
                            onClick={() => setShowAddAdminModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg--primary text-white font-medium rounded-xl hover:bg-purple-800 transition-colors cursor-pointer duration-300"
                        >
                            Add Admin
                        </button>
                    )}
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg--secondary text-white font-medium rounded-xl hover:bg-red-800 transition-colors cursor-pointer duration-300"
                    >
                        Log Out
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-4 lg:mt-8 px-6">
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-lg">
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

                <div className="relative bg-white rounded-3xl shadow-xl ring-1 ring-gray-100 px-6 py-8 lg:px-10 lg:py-12 mt-12 lg:mt-16 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1" />
                    <h3 className="text-2xl font-bold text--secondary mb-6 border-b-2 border-gray-100 pb-4">
                        Detail Information
                    </h3>

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
