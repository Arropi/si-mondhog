"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";

export async function addAdminService(email: string) {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;

        const response = await fetch(`${API_BASE_URL}/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            const errorResponse = await response.json().catch(() => ({}));
            return { 
                success: false, 
                message: errorResponse.message || `Error HTTP: ${response.status}` 
            };
        }

        const data = await response.json();
        return { 
            success: true, 
             message: data.message || "Admin success added" 
        };
    } catch (error: any) {
        console.error("Error in addAdminService:", error);
        return { 
            success: false, 
            message: error.message || "Internal server error" 
        };
    }
}