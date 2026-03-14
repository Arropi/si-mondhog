"use client";

interface SuccessAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    emailSentTo: string;
}

export default function SuccessAlertModal({ isOpen, onClose, emailSentTo }: SuccessAlertModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-gray-900/40 backdrop-blur-[2px] px-4">
            <div className="bg-white rounded-3xl w-full max-w-sm p-10 shadow-2xl relative text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <button 
                    onClick={onClose} 
                    className="absolute right-5 top-5 p-1 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                </button>
                
                <div className="w-20 h-20 rounded-full bg-emerald-400 border-[6px] border-emerald-100 flex items-center justify-center mb-6 shadow-sm mt-2">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-[#8B5CF6] mb-3 tracking-tight">Successfully Added Device</h3>
                <p className="text-gray-500 text-sm">Activate code has been send to</p>
                <p className="text-gray-900 font-bold text-[15px] mt-1 mb-2">
                    {emailSentTo || "your email."}
                </p>
            </div>
        </div>
    );
}

