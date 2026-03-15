"use client";

import React, { useState } from "react";
import { deleteDeviceService } from "@/service/deviceService";
import { useRouter } from "next/navigation";
import ConfirmationDeleteDevice from "@/components/ui/confirmationDeleteDevice";

export default function DeleteMachineButton({ machineId, deviceName = "Unknown Device" }: { machineId: string, deviceName?: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteDeviceService(machineId);
            if (result.success) {
                // Tampilkan pesan success
                setIsSuccess(true);
                // Beri waktu sejenak agar user bisa membaca modal "Done" sebelum redirect
                setTimeout(() => {
                    setIsModalOpen(false);
                    router.push('/devices'); 
                    router.refresh();
                }, 2000); // 2 Detik delay
            } else {
                alert("Gagal Hapus: " + result.message);
                setIsModalOpen(false);
            }
        } catch (e) {
            alert("Terjadi kesalahan jaringan.");
            setIsModalOpen(false);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-2 bg--secondary hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-[13px] font-bold transition-colors shadow-sm cursor-pointer`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
            </button>

            <ConfirmationDeleteDevice
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                isSuccess={isSuccess}
                deviceName={deviceName}
            />
        </>
    );
}