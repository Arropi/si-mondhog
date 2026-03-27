export default function Loading() {
    return (
        <div className="w-full min-h-screen bg--background p-4 lg:p-8 font-sans animate-pulse">
            <div className="flex flex-col gap-6">
                {/* Header skeleton */}
                <div className="flex justify-between items-center">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
                </div>

                {/* Content skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 h-[200px]">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                            <div className="h-8 w-32 bg-gray-200 rounded mb-3"></div>
                            <div className="h-20 bg-gray-100 rounded-xl"></div>
                        </div>
                    ))}
                </div>

                {/* Table skeleton */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="h-5 w-40 bg-gray-200 rounded mb-6"></div>
                    <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
