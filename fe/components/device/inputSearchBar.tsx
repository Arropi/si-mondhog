import InputSearch from "../../modules/devices/inputSearch";

interface InputSearchBarProps {
    keyword?: string;
}

export default async function InputSearchBar({ keyword }: InputSearchBarProps) {
    // Bagian server-side: digunakan untuk menerima dan menyiapkan keyword
    // dari server page sebelum diteruskan ke client component. 
    return (
        <div className="w-full sm:w-80">
            <InputSearch initialQuery={keyword} />
        </div>
    );
}