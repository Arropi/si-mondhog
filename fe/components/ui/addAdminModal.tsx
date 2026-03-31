"use client";

import { useState } from "react";
import { addAdminService } from "../../service/accService";

interface AddAdminModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddAdminModal({ isOpen, onClose }: AddAdminModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [serverErrorMsg, setServerErrorMsg] = useState("");

    if (!isOpen) return null;

    const validateEmail = () => {
        if (!email.trim()) {
            setErrorMsg("Email required!");
            return false;
        }

        // Cek domain email (harus @mail.ugm.ac.id atau @ugm.ac.id)
        const domainRegex = /@(mail\.ugm\.ac\.id|ugm\.ac\.id)$/i;
        if (!domainRegex.test(email)) {
            setErrorMsg("Must be @mail.ugm.ac.id or @ugm.ac.id");
            return false;
        }

        setErrorMsg("");
        return true;
    };

    const handleAdd = async () => {
        if (!validateEmail()) return;

        setStatus("loading");

        try {
            const res = await addAdminService(email);
            if (res.success) {
                setStatus("success");
            } else {
                setStatus("error");
                setServerErrorMsg(res.message);
            }
        } catch (error: any) {
            setStatus("error");
            setServerErrorMsg("Internal server error");
        }
    };

    const handleClose = () => {
        // Reset state ketika modal ditutup
        setEmail("");
        setErrorMsg("");
        setServerErrorMsg("");
        setStatus("idle");
        onClose();
    };

    if (status === "success") {
        return (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl p-10 max-w-sm w-full shadow-2xl flex flex-col items-center gap-4 transform transition-transform zoom-in-95">
                    <div className="w-16 h-16 rounded-full bg-emerald-400 border-[4px] border-emerald-100 flex items-center justify-center mb-2 shadow-sm">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-emerald-500 mb-2">Success Added Admin</h3>

                    {/* Tombol close opsional, bisa juga auto-close menggunakan setTimeout */}
                    <button
                        onClick={handleClose}
                        className="mt-4 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors w-full"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl p-10 max-w-sm w-full shadow-2xl flex flex-col items-center gap-4 transform transition-transform zoom-in-95">
                    <div className="w-16 h-16 rounded-full bg-red-500 border-[4px] border-red-100 flex items-center justify-center mb-2 shadow-sm">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-red-500 mb-2">Failed to Add Admin</h3>
                        <p className="text-gray-500 text-sm">{serverErrorMsg}</p>
                    </div>

                    <div className="flex w-full gap-3 mt-4">
                        <button
                            onClick={() => setStatus("idle")}
                            className="flex-1 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity animate-in fade-in duration-300">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAdd();
                }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col gap-6 transform transition-transform zoom-in-95"
            >
                <h3 className="text-xl font-bold text-[#8B5CF6]">
                    Add Admin
                </h3>

                <div className="flex flex-col gap-2">
                    <label className={`text-sm font-medium ${errorMsg ? 'text-pink-500' : 'text-gray-600'}`}>
                        Admin Email*
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMsg) setErrorMsg("");
                        }}
                        className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none transition-colors ${errorMsg
                                ? 'border-pink-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500'
                                : 'border-gray-300 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]'
                            }`}
                        placeholder="Enter admin email..."
                        disabled={status === "loading"}
                    />
                    {errorMsg && (
                        <p className="text-pink-500 text-xs text-right mt-1">
                            {errorMsg}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between w-full mt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={status === "loading"}
                        className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-8 py-2 rounded-lg bg--primary text-white font-medium hover:bg--primary/80 transition-colors cursor-pointer disabled:opacity-70 flex items-center gap-2"
                    >
                        {status === "loading" ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </>
                        ) : (
                            "Add"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
