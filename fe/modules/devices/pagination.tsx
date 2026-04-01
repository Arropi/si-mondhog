"use client";

interface PaginationClientProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationClient({ currentPage, totalPages, onPageChange }: PaginationClientProps) {
    if (totalPages <= 1) return null;

    const progress = (currentPage / totalPages) * 100;

    return (
        <div className="mt-12 md:mt-20 mb-12 flex flex-col items-center gap-6 px-4">
            <div className="w-full max-w-[400px] h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#4B5563] transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="text-[13px] font-bold text-[#4B5563]">
                Page {currentPage}/{totalPages}
            </p>

            <div className={`flex w-full max-w-[400px] ${currentPage > 1 && currentPage < totalPages ? "justify-between" : "justify-center"}`}>
                {currentPage > 1 && (
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-8 py-3 bg--background hover:bg-gray-200 text-black border border-gray-200 font-bold rounded-2xl transition-all shadow-md shadow-gray-100 active:scale-95 cursor-pointer"
                    >
                        Previously
                    </button>
                )}
                {currentPage < totalPages && (
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-8 py-3 bg--primary hover:bg-[#6D28D9] text-white font-bold rounded-2xl transition-all shadow-md shadow-purple-200 active:scale-95 cursor-pointer"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}