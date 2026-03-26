// fe/services/deviceService.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";

export interface DeviceStats {
    total: number;
    online: number;
    offline: number;
    pending: number;
}

export interface Device {
    id: string;
    name: string;
    os: "windows" | "macOS" | "linux";
    status: "online" | "offline" | "pending";
}


export async function getDeviceStats(): Promise<DeviceStats> {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;
        const response = await fetch(`${API_BASE_URL}/devices?limit=100`, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        const machineData = data.machines || [];

        let onlineCount = 0;
        let offlineCount = 0;
        let pendingCount = 0;

        machineData.forEach((machine: any) => {
            const status = machine.status ? machine.status.toLowerCase() : "pending";
            if (status === "online") onlineCount++;
            else if (status === "offline") offlineCount++;
            else pendingCount++;
        });

        return {
            total: data.totalMachines || machineData.length,
            online: onlineCount,
            offline: offlineCount,
            pending: pendingCount
        };
    } catch (error) {
        console.error("Kesalahan dalam getDeviceStats:", error);
        // Mengembalikan struktur data kosong default untuk menghindari crash
        return { total: 0, online: 0, offline: 0, pending: 0 };
    }
}

export async function getDeviceList(): Promise<Device[]> {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;
        const response = await fetch(`${API_BASE_URL}/devices?limit=100`, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        const machineData = data.machines || [];
        const mappedDevices: Device[] = machineData.map((machine: any) => {
            return {
                id: machine._id,
                name: machine.hostname,
                os: (machine.os.toLowerCase() === "macos" ? "macOS" : machine.os.toLowerCase()) as any,
                status: machine.status ? machine.status.toLowerCase() : "pending"
            };
        });

        console.log("Daftar Device NOWW ====>", mappedDevices);
        return mappedDevices;
    } catch (error) {
        console.error("Kesalahan dalam getDeviceList:", error);
        return []; // return array kosong jika API gagal
    }
}

export async function createDeviceService(data: { hostname: string; os: "Linux" | "Windows" | "macOS"; email: string }) {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;

        const response = await fetch(`${API_BASE_URL}/devices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                hostname: data.hostname,
                os: data.os,
                email: data.email,
            })
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            return { success: false, message: errorResponse.message || "Gagal menyimpan device" };
        }
        revalidatePath('/devices');
        return { success: true, message: "Device berhasil didaftarkan!" };
    } catch (error: any) {
        console.error("Gagal Request:", error);
        return { success: false, message: "Terjadi kesalahan di jaringan peladen." };
    }
}

export async function getDeviceById(id: string) {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;

        const response = await fetch(`${API_BASE_URL}/devices/${id}`, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            console.error(`Error HTTP: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data.machine;
    } catch (error) {
        console.error("Kesalahan dalam getDeviceById:", error);
        return null;
    }
}

export async function updateDeviceService(id: string, data: { hostname?: string; }) {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;

        const response = await fetch(`${API_BASE_URL}/devices/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return { success: false, message: errorResponse.message || "Failed to update device" };
        }
        revalidatePath(`/devices/${id}`);
        revalidatePath('/devices');
        return { success: true, message: "Device successfully updated!" };
    } catch (error: any) {
        console.error("Gagal Update:", error);
        return { success: false, message: "Terjadi kesalahan di jaringan peladen." };
    }
}

export async function deleteDeviceService(id: string) {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;

        const response = await fetch(`${API_BASE_URL}/devices/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return { success: false, message: errorResponse.message || "Gagal menghapus device" };
        }

        return { success: true, message: "Device berhasil dihapus!" };
    } catch (error: any) {
        console.error("Gagal Hapus:", error);
        return { success: false, message: "Terjadi kesalahan di jaringan peladen." };
    }
}

export async function getPerformanceData(id: string) {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;
        const response = await fetch(`${API_BASE_URL}/devices/${id}/performance`, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        if (!response.ok) return null; // Jika BE belum siap, return null
        const data = await response.json();
        return data.performance;
    } catch (error) {
        return null; // Jika error/jaringan mati, return null
    }
}

export async function getLogDeviceActivity(id: string) {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;
        const response = await fetch(`${API_BASE_URL}/devices/${id}/logs`, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        if (!response.ok) return null; // Jika BE belum siap, return null
        const data = await response.json();
        return data.logs || [];
    } catch (error) {
        return null; // Jika error/jaringan mati, return null
    }
}