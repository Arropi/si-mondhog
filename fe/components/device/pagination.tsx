import PaginationClient from "@/modules/devices/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
    return <PaginationClient {...props} />;
}