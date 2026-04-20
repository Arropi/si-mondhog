"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"

const handleLogin = async () => {
    await signIn("google", { callbackUrl: '/dashboard' })
}

const ButtonLogin = () => {
    return (
        <>
            <button
                onClick={handleLogin}
                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all font-semibold text-black w-lg cursor-pointer">
                <Image
                    src="/images/googleIcon.svg"
                    alt="Google Icon"
                    width={24}
                    height={24}
                />
                Login with UGM Email
            </button>
        </>
    )
}

export default ButtonLogin