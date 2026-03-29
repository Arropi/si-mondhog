export default function Loading() {
    return (
        <div className="w-full min-h-screen bg--background p-4 lg:p-8 font-sans animate-pulse">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content (Left) */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-2">
                        <div className="h-8 w-40 bg-gray-200 rounded-lg"></div>
                        <div className="flex gap-4">
                            <div className="h-4 w-12 bg-gray-200 rounded"></div>
                            <div className="h-4 w-14 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    {/* DatePicker Skeleton */}
                    <div className="flex gap-3">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="min-w-[135px] h-[80px] bg-gray-200 rounded-[20px]"></div>
                        ))}
                    </div>

                    {/* RAM Chart Skeleton */}
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 h-[350px]">
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-5 w-32 bg-gray-200 rounded"></div>
                            <div className="h-5 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-[250px] bg-gray-100 rounded-xl"></div>
                    </div>

                    {/* CPU + Harddisk Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 h-[300px]">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-5 w-28 bg-gray-200 rounded"></div>
                                    <div className="h-5 w-20 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-[200px] bg-gray-100 rounded-xl"></div>
                            </div>
                        ))}
                    </div>

                    {/* Logs Skeleton */}
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white rounded-[24px] p-8 border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <div className="h-5 w-44 bg-gray-200 rounded"></div>
                                <div className="h-8 w-28 bg-gray-200 rounded-lg"></div>
                            </div>
                            <div className="space-y-4">
                                {[...Array(5)].map((_, j) => (
                                    <div key={j} className="h-4 bg-gray-100 rounded w-full"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar (Right) Skeleton */}
                <div className="w-full lg:w-[320px] flex flex-col gap-6 pt-1">
                    {/* Peak Performance */}
                    <div>
                        <div className="h-4 w-36 bg-gray-200 rounded mb-4"></div>
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 mb-4">
                                <div className="h-3 w-16 bg-gray-200 rounded mb-3"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-7 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-12 w-16 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full mt-4"></div>
                            </div>
                        ))}
                    </div>

                    {/* Device Stats */}
                    <div>
                        <div className="h-4 w-16 bg-gray-200 rounded mb-4"></div>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 mb-3">
                                <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
