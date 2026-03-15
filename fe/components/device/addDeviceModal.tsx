import { useState } from "react";
import { cn } from "../../utils/cn";

interface AddDeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;

    // states
    hostname: string;
    setHostname: (val: string) => void;
    selectedOS: string;
    setSelectedOS: (val: "Linux" | "Windows" | "macOS") => void;
    email: string;
    setEmail: (val: string) => void;
}

export default function AddDeviceModal({
    isOpen, onClose, onSubmit, isLoading, hostname, setHostname, selectedOS, setSelectedOS, email, setEmail
}: AddDeviceModalProps) {

    const [hasError, setHasError] = useState(false);

    if (!isOpen) {
        if (hasError) setHasError(false);
        return null;
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/40 backdrop-blur-[2px] px-4">
            <div className="absolute inset-0" onClick={!isLoading ? onClose : undefined} />

            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative z-10 border border-gray-100 text-left">
                <h2 className="text-xl font-bold text--primary mb-6">Add Device</h2>

                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    {/* Input Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700">Device Name<span className="text--danger ml-1">*</span></label>
                        <input
                            type="text"
                            required
                            value={hostname}
                            onInvalid={() => setHasError(true)}
                            onChange={(e) => {
                                setHasError(false);
                                setHostname(e.target.value);
                            }}
                            disabled={isLoading}
                            className={cn(
                                "w-full px-4 py-2.5 rounded-lg border focus:outline-none text-sm text-black",
                                hasError
                                    ? "border--secondary focus:border--secondary focus:ring-1 focus:ring--secondary bg-red-50"
                                    : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            )}
                        />
                    </div>
                    {/* Input OS */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700">Choose OS<span className="text--danger ml-1">*</span></label>
                        <div className="flex items-center gap-3">
                            {(["Linux", "Windows", "macOS"] as const).map((os) => (
                                <button
                                    key={os} type="button" onClick={() => setSelectedOS(os)} disabled={isLoading}
                                    className={cn(
                                        "flex-1 py-2 px-2.5 text-xs font-medium rounded-lg border transition-all duration-200",
                                        selectedOS === os ? "bg--primary text-white font-bold" : "border-gray-200 text-gray-400 hover:border-gray-300"
                                    )}
                                >
                                    {os === "macOS" ? "MacOS" : os}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* imput email pc user */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700">Email<span className="text--danger ml-1">*</span></label>
                        <input
                            type="email"
                            required
                            value={email}
                            onInvalid={() => setHasError(true)}
                            onChange={(e) => {
                                setHasError(false);
                                setEmail(e.target.value);e                                  }}
                            disabled={isLoading}
                            className={cn(
                                "w-full px-4 py-2.5 rounded-lg border focus:outline-none text-sm text-black",
                                hasError
                                    ? "border--secondary focus:border--secondary focus:ring-1 focus:ring--secondary bg-red-50"
                                    : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            )}
                        />
                    </div>
                    {/* Submit Actions */}
                    <div className="flex justify-between mt-6">
                        <button type="button" onClick={onClose} disabled={isLoading} className="px-6 py-2.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Cancel</button>
                        <button type="submit" disabled={isLoading} className="px-8 py-2.5 text-xs font-bold text-white bg--primary rounded-lg hover:bg-purple-700 disabled:opacity-50">
                            {isLoading ? "Saving..." : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}