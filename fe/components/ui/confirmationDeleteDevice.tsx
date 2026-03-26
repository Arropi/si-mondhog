import React from 'react';
import Image from 'next/image';

interface ConfirmationDeleteDeviceProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
    isSuccess: boolean;
    deviceName: string;
}

export default function ConfirmationDeleteDevice({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    isSuccess,
    deviceName
}: ConfirmationDeleteDeviceProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-[32px] p-8 max-w-[360px] w-full shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
                
                {/* Trash Icon */}
                <div className="items-center justify-center mb-6 z-10">
                   <Image 
                           src="/images/confirmationDelete.svg"
                           alt="Delete Icon" 
                           width={50} 
                           height={50} 
                           className="object-contain"
                       />
                </div>

                {!isSuccess ? (
                    <>
                        <h3 className="text-[17px] font-extrabold text-[#333333] mb-8 leading-[1.3] px-2">
                            Are you sure want to Delete {deviceName}?
                        </h3>
                        
                        <div className="flex items-center gap-4 w-full justify-center">
                            <button 
                                onClick={onClose}
                                disabled={isLoading}
                                className="py-2.5 px-6 rounded-2xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition w-full max-w-[125px] cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={onConfirm}
                                disabled={isLoading}
                                className="py-2.5 px-6 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold transition flex items-center justify-center w-full max-w-[125px] cursor-pointer"
                            >
                                {isLoading ? "..." : "Delete"}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="text-[24px] font-bold text-[#111827] mb-2 tracking-tight">
                            Done!
                        </h3>
                        <p className="text-[17px] text-[#4B5563] font-normal pb-2">
                            {deviceName} has been deleted
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}