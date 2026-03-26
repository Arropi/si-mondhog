"use client";

interface FailedAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    errorMessage: string;
}

export default function FailedAlertModal({ isOpen, onClose, errorMessage }: FailedAlertModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-gray-900/40 backdrop-blur-[2px] px-4">
            <div className="bg-white rounded-3xl w-full max-w-sm p-10 shadow-2xl relative text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <button 
                    onClick={onClose} 
                    className="absolute right-5 top-5 p-1 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div className="w-20 h-20 rounded-full bg-red-400 border-[6px] border-red-100 flex items-center justify-center mb-6 shadow-sm mt-2">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <circle cx="12" cy="16" r="1.5" fill="white"></circle>
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-red-500 mb-3 tracking-tight">Validation Failed</h3>
                <p className="text-gray-500 text-sm">{errorMessage}</p>
                
                <button 
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
