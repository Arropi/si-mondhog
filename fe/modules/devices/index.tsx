import ButtonDevice from "./buttonDevice";
import DeviceMonitor from "./deviceMonitor";
import CardDevice from "./cardDevice";
import InputSearchBar from "../../components/device/inputSearchBar";
import DropdownFilterBar from "../../components/device/dropdownFilterBar";

export default async function DevicesPage({ query, status }: { query?: string, status?: string }) {
    const dataDevice = {
        'total': 10,
        'online': 3,
        'offline': 4,
        'pending': 3
    }
    return (
        <div className="px-12 py-8">
            <header className="bg-background flex justify-between items-center font-bold text--secondary text-2xl">
                All Devices
                <ButtonDevice />
            </header>

            <div className="mt-8">
                <DeviceMonitor total={dataDevice.total} pending={dataDevice.pending} online={dataDevice.online} offline={dataDevice.offline} />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <DropdownFilterBar status={status} />

                <div className="w-full sm:w-auto flex-1 flex justify-end">
                    <InputSearchBar keyword={query} />
                </div>
            </div>

            <div className="mt-8">
                <CardDevice query={query} status={status} />
            </div>
        </div>
    )
}