'use client'

import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
    console.log("Providers runninggg")
    return <SessionProvider>{children}</SessionProvider>
}