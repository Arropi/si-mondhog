"use client";

import React, { useState, useEffect, useRef, JSX } from "react";
import { updateDeviceService } from "@/service/deviceService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

// Objek untuk memetakan ikon berdasarkan jenis OS
const OsIcons: Record<string, JSX.Element> = {
  windows: (
      <Image src="/images/windows.svg" alt="Windows" width={28} height={28} />
  ),
  macos: (
      <Image src="/images/mac.svg" alt="MacOS" width={28} height={28} />
  ),
  linux: (
      <Image src="/images/linux.svg" alt="Linux" width={28} height={28} />
  )
};

export default function DeviceInfoCardClient({ 
    machineId, 
    currentHostname, 
    currentOs,
    status,
    statusColor
}: { 
    machineId: string, 
    currentHostname: string, 
    currentOs: string,
    status: string,
    statusColor: string
}) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hostname, setHostname] = useState(currentHostname);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleUpdate = async () => {
        if (!hostname.trim()) {
            setError("*Name is required");
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await updateDeviceService(machineId, { hostname });
            if (result.success) {
                setIsEditing(false);
                router.refresh();
            } else {
                alert("Gagal: " + result.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEditing) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-50 h-[170px] flex flex-col justify-center">
                <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-8">Device Name & OS</div>
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <input 
                            ref={inputRef}
                            className={`text-2xl font-extrabold text-gray-900 truncate focus:outline-none bg-transparent border-b pb-1 caret-black w-full transition-colors ${error ? "border-[#FF4D4F]" : "border-gray-200 focus:border-[#6B46C1]"}`}
                            value={hostname}
                            onChange={e => {
                                setHostname(e.target.value);
                                if (e.target.value.trim() !== "") setError("");
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Enter') handleUpdate();
                                if (e.key === 'Escape') {
                                    setHostname(currentHostname);
                                    setError("");
                                    setIsEditing(false);
                                }
                            }}
                        />
                        {error && <div className="text-[#FF4D4F] text-[13px] absolute mt-0.5">{error}</div>}
                    </div>
                    <div className="flex gap-3 mt-2">
                        <button 
                            onClick={handleUpdate} 
                            disabled={isSubmitting} 
                            className="bg-[#6B46C1] hover:bg-purple-800 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors cursor-pointer"
                        >
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                        <button 
                            onClick={() => {
                                setHostname(currentHostname);
                                setError("");
                                setIsEditing(false);
                            }} 
                            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-5 py-2 rounded-xl text-sm transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-50 h-[170px] flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Device Name & OS</div>
                    <div className="flex items-center justify-center bg-gray-50 w-12 h-12 rounded-xl text-gray-400">
                        {currentOs ? OsIcons[currentOs.toLowerCase()] || OsIcons["linux"] : OsIcons["linux"]}
                    </div>
                </div>
                
                <div className="flex items-center gap-3 mb-2 overflow-hidden">
                    <h1 className="text-2xl font-extrabold text-gray-900 truncate max-w-[250px]">{currentHostname}</h1>
                    <span className={`${statusColor} text-[10px] font-bold px-2 py-1 rounded-md tracking-widest shrink-0`}>{status}</span>
                </div>
            </div>
            
            <div className="flex justify-between items-end">
                <div className="text-sm font-semibold text-gray-400 capitalize">{currentOs}</div>
                {isAdmin && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="text-[13px] font-bold text-gray-500 flex items-center gap-1.5 hover:text-purple-600 transition-colors cursor-pointer"
                    >
                        <Image src="/images/editIcon.svg" alt="Edit" width={10} height={10} />
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}