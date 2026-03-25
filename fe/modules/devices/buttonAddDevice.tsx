"use client";

import React, { useState } from "react";
import { createDeviceService } from "../../service/deviceService"
import AddDeviceModal from "../../components/ui/addDeviceModal";
import { useRouter } from "next/navigation";
import SuccessAlertModal from "../../components/ui/successAlertModal";
import FailedAlertModal from "../../components/ui/failedAlertModal";

export default function ButtonAddDevice() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [hostname, setHostname] = useState("");
    const [selectedOS, setSelectedOS] = useState<"Linux" | "Windows" | "macOS">("Linux");
    const [email, setEmail] = useState("");
    const [successData, setSuccessData] = useState({
        show: false,
        emailSentTo: ""
    })
    const [failedData, setFailedData] = useState({
        show: false,
        message: ""
    })

    const handleAddDevice = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!hostname.trim() || !selectedOS || !email.trim()) {
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.ugm\.ac\.id|ugm\.ac\.id)$/;
        if (!emailRegex.test(email)) {
            setFailedData({
                show: true,
                message: "Email must end with @gmail.com, @mail.ugm.ac.id, or @ugm.ac.id"
            });
            return;
        }

        setIsLoading(true);

        const result = await createDeviceService({ hostname, os: selectedOS, email });

        if (result.success) {
            setSuccessData({
                show: true,
                emailSentTo: email
            })
            setHostname("");
            setSelectedOS("Linux");
            setEmail("");
            setIsOpen(false);
            router.refresh();
        } else {
            setFailedData({
                show: true,
                message: result.message
            });
        }

        setIsLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 py-2 px-6 bg--secondary text-white font-semibold text-sm rounded-xl hover:bg-pink-700 transition-colors duration-300 cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Device
            </button>

            <AddDeviceModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleAddDevice}
                isLoading={isLoading}
                hostname={hostname}
                setHostname={setHostname}
                email={email}
                setEmail={setEmail}
                selectedOS={selectedOS}
                setSelectedOS={setSelectedOS}
            />

            <SuccessAlertModal
                isOpen={successData.show}
                onClose={() => setSuccessData({ show: false, emailSentTo: "" })}
                emailSentTo={successData.emailSentTo}
            />

            <FailedAlertModal
                isOpen={failedData.show}
                onClose={() => setFailedData({ show: false, message: "" })}
                errorMessage={failedData.message}
            />
        </>
    )
}