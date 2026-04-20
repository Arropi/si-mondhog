import Image from "next/image"
import ButtonLogin from "./buttonLogin"

const LoginPage = () => {
    return (
        <div className="bg--primary min-h-screen w-full overflow-x-hidden flex items-center justify-center">
            <div className="bg-white w-full rounded-2xl sm:rounded-3xl p-4 md:p-6 flex mx-4 sm:mx-6 md:mx-10 my-4 sm:my-6 md:my-10" style={{ minHeight: 'calc(100vh - 48px)' }}>
                <div className="relative flex-1 rounded-2xl flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center overflow-hidden">
                    <svg className="absolute inset-1 sm:inset-4 pointer-events-none w-[calc(100%-8px)] sm:w-[calc(100%-32px)] h-[calc(100%-8px)] sm:h-[calc(100%-32px)]" xmlns="http://www.w3.org/2000/svg">
                        <rect
                            width="100%"
                            height="100%"
                            fill="none"
                            rx="16"
                            ry="16"
                            stroke="#7535FF"
                            strokeWidth="3"
                            strokeDasharray="50, 50"
                        />
                    </svg>

                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <div className="mb-6 relative w-24 h-24 sm:w-32 sm:h-32">
                            <Image
                                src="/images/robotIcon.svg"
                                alt="Robot Icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text--secondary mb-4 tracking-tight">
                            Hello Civitas Akademika
                        </h1>
                        <p className="max-w-2xl text-sm sm:text-base text--text-gray mb-10 leading-relaxed font-medium">
                            This monitoring system functions as an integrated control center that monitors server health in real time, analyzes activity history through logs, and manages data flow efficiently to ensure the stability of the IT infrastructure.
                        </p>
                        <ButtonLogin />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage