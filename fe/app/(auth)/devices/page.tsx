import DevicesPage from "../../../modules/devices";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };

export default async function Devices(props: { searchParams?: SearchParams }) {
    const searchParams = await props.searchParams;
    const query = typeof searchParams?.query === 'string' ? searchParams.query : "";
    const os = typeof searchParams?.os === 'string' ? searchParams.os : "all";
    const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;

    return (
        <div className="h-full">
            <DevicesPage query={query} os={os} page={page} />
        </div>
    )
}