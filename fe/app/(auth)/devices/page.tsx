import DevicesPage from "../../../modules/devices";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };

export default async function Devices(props: { searchParams?: SearchParams }) {
    const searchParams = await props.searchParams;
    const query = typeof searchParams?.query === 'string' ? searchParams.query : "";
    const status = typeof searchParams?.status === 'string' ? searchParams.status : "all";

    return (
        <div className="h-[200vh]">
            <DevicesPage query={query} status={status} />
        </div>
    )
}