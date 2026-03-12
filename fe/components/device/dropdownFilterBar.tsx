import DropdownFilter from "../../modules/devices/dropdownFilter";


interface DropdownFilterBarProps {
    status?: string;
}

export default async function DropdownFilterBar({ status }: DropdownFilterBarProps) {
    // Bagian server-side untuk dropdown filter
    return (
        <div className="w-full sm:w-48 relative">
            <DropdownFilter initialStatus={status} />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    );
}
