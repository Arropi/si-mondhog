export default function DatePickerWeeks() {
    // Menghitung rentang 7 hari terakhir (hari ini dan 6 hari sebelumnya)
    const today = new Date();
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(today.getDate() - 6);

    const monthYear = today.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    const startDay = sixDaysAgo.getDate();
    const endDay = today.getDate();

    return (
        <div className="w-full bg-white rounded-[20px] py-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col items-center justify-center animate-fade-in mb-2">
            <div className="text-gray-500 font-bold text-md tracking-widest mb-3">
                {monthYear}
            </div>
            <div className="text-2xl font-black text-gray-800 tracking-tight">
                {startDay} - {endDay}
            </div>
        </div>
    );
}