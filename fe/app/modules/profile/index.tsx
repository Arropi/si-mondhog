"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfilePage(profileProps: {
    name: string;
    nim: string;
    email: string;
    prodi: string;
}) {
    const { data: session, status } = useSession();

    // toast
    interface ToastItem {
        id: string;
        message: string;
        type?: "success" | "error" | "info";
    }

    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = (
        message: string,
        type: ToastItem["type"] = "info",
        ttl = 3500
    ) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setToasts((s) => [...s, { id, message, type }]);
        setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), ttl);
    };

    function ToastContainer() {
        if (status === "loading") {
            return <div className="min-h-screen flex items-center justify-center text-black">Loading profile...</div>
        }
        return (
            <div className="fixed top-15 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`pointer-events-auto max-w-sm w-full text-white rounded-lg p-3 shadow-lg transform transition-all duration-300
              ${t.type === "success" ? "bg-[#1E40AF]" : t.type === "error" ? "bg-red-600" : "bg-[#004CB0]"}
              `}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <div className="text-sm">{t.message}</div>
                    </div>
                ))}
            </div>
        );
    }
    // --- end inline toast ---

    // Local profile state (initialized from props)
    const [profile, setProfile] = useState({
        name: profileProps.name ?? "",
        nim: profileProps.nim ?? "",
        email: profileProps.email ?? "",
        prodi: profileProps.prodi ?? "",
    });

    // Form state for editing
    const [form, setForm] = useState({
        nim: profileProps.nim ?? "",
        prodi: profileProps.prodi ?? "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sync local state when parent props change
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setProfile((p) => ({
                ...p,
                name: session.user.name ?? p.name,
                email: session.user.email ?? p.email,
            }));
        }
        setForm({
            nim: profileProps.nim ?? "",
            prodi: profileProps.prodi ?? "",
        });
    }, [
        status,
        session,
        profileProps.nim,
        profileProps.prodi
    ]);

    const handleEdit = () => {
        setForm({ nim: profile.nim, prodi: profile.prodi });
        setIsEditing(true);
        setError(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setForm({ nim: profile.nim, prodi: profile.prodi });
        setError(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleSave = async () => {
        // --- DUMMY BEHAVIOR UNTUK MELIHAT UI ---
        setIsSaving(true);
        setError(null);

        setTimeout(() => {
            setProfile((p) => ({
                ...p,
                nim: form.nim,
                prodi: form.prodi,
            }));
            setIsEditing(false);
            setIsSaving(false);
            showToast("Profile updated successfully (DUMMY)!", "success");
        }, 1500);
        // ----------------------------------------

        /* ASLI: 
        if (status !== "authenticated" || !session?.user?.accessToken) {
            setError("Unauthorized");
            return;
        }

        setIsSaving(true);
        // ... (Kode API Asli Anda yang disembunyikan sementara) ...
        */
    };

    return (
        <div className="min-h-screen bg-white pb-10">
            {/* Toasts (inline) */}
            <ToastContainer />

            {/* Header */}
            <div className="flex items-center mt-10 ml-10 gap-3">
                <Image
                    src="/images/profileIcon.svg"
                    alt="Profile Icon"
                    width={28}
                    height={28}
                />
                <h2 className="text-2xl font-semibold text-black">Profile</h2>

                {/* <div className="ml-auto mr-10">  
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-[#004CB0] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                            Edit profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleCancel}
                                disabled={isSaving}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 bg-[#004CB0] text-white rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}
                </div> */}
            </div>

            <div className="max-w-4xl mx-auto mt-8 px-6">
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border--secondary">
                        {session?.user?.image ? (
                            <Image
                                src={session.user.image}
                                alt="profile"
                                width={128}
                                height={128}
                                className="object-cover w-full h-full"
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-3xl font-medium text-gray-500">
                                    {profile.name?.charAt(0) ?? "U"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-8 mt-6 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1" />
                    <h3 className="text-2xl font-bold text--secondary mb-6">
                        Detail Information
                    </h3>

                    {isLoading && (
                        <p className="text-sm text-gray-500 mb-4">Loading data...</p>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Name</p>
                            <p className="text-gray-800 font-bold">
                                {profile.name || "Unknown User"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm mb-1">NIM</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="nim"
                                    value={form.nim}
                                    onChange={handleChange}
                                    placeholder="Masukkan NIM"
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004CB0] focus:border-transparent"
                                />
                            ) : (
                                <p className="text-gray-800 font-bold">
                                    {profile.nim || (
                                        <span className="text-gray-400 italic">Not provided</span>
                                    )}
                                </p>
                            )}
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm mb-1">Email</p>
                            <p className="text-gray-800 font-bold line-clamp-2">{profile.email}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm mb-1">Program of Study</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="prodi"
                                    value={form.prodi}
                                    onChange={handleChange}
                                    placeholder="Masukkan Program Studi"
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004CB0] focus:border-transparent"
                                />
                            ) : (
                                <p className="text-gray-800 font-bold">
                                    {profile.prodi || (
                                        <span className="text-gray-400 italic">Not provided</span>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
