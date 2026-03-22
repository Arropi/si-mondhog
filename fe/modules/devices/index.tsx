import ButtonDevice from "./buttonAddDevice";
import DeviceMonitor from "./deviceMonitor";
import CardDevice from "./cardDevice";
import InputSearchBar from "../../components/device/inputSearchBar";
import DropdownFilterBar from "../../components/device/dropdownFilterBar";
import { getDeviceStats } from "../../service/deviceService";

export default async function DevicesPage({ query, os, page }: { query?: string, os?: string, page?: number }) {
    const statsData = await getDeviceStats();
    
    return (
        <div className="px-12 py-8">
            <header className="bg-background flex justify-between items-center font-bold text--secondary text-2xl">
                All Devices
                <ButtonDevice />
            </header>

            <div className="mt-8">
                <DeviceMonitor total={statsData.total} pending={statsData.pending} online={statsData.online} offline={statsData.offline} />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <DropdownFilterBar os={os} />

                <div className="w-full sm:w-auto flex-1 flex justify-end">
                    <InputSearchBar keyword={query} />
                </div>
            </div>

            <div className="mt-8">
                <CardDevice key={`${statsData.total}-${query}-${os}`} query={query} os={os} initialPage={page} />
            </div>
        </div>
    )
}