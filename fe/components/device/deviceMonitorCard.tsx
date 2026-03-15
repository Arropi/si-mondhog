import { cn } from "../../utils/cn"

export default function DeviceMonitorCard({
    title,
    className,
    amount
}: {
    title: string,
    amount: number
} & React.ComponentProps<'div'>) {
    return (
        <div className="bg-white rounded-xl p-5 md:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col gap-1 md:gap-2">
            <span className={cn(`text-[11px] md:text-xs font-bold tracking-wider uppercase `, className)}>
                 {title}
            </span>
            <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {amount}
            </span>
        </div>
    )
}