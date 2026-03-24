"use client";

import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg--primary text-white pt-16 pb-8 px-6 md:px-16 w-full mt-24">
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">
                {/* Left */}
                <div className="flex items-center gap-6 md:gap-8">
                    <Image
                        src="/images/iconFooter.svg"
                        alt="SyMon logo"
                        width={140}
                        height={140}
                        className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain"
                    />
                    <span className="font-extrabold text-6xl md:text-8xl lg:text-[100px] tracking-tight">SyMon</span>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end lg:max-w-[350px] text-right">
                    <p className="text-sm md:text-sm leading-tight mb-5 text-white/95">
                        A robust system monitoring application that
                        tracks and visualizes real-time hardware
                        telemetry, including processor load,
                        memory allocation, and disk space usage,
                        ensuring optimal system stability and
                        resource management.
                    </p>
                    <div className="flex items-center justify-end gap-5">
                        <a href="https://www.instagram.com/trisvugm/" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                            <Image src="/images/instagram.svg" alt="instagram icon" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                        <a href="tel:02746491302" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                            <Image src="/images/callIcon.svg" alt="phone icon" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                        <a href="mailto:tedi.sv@ugm.ac.id" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                            <Image src="/images/mailIcon.svg" alt="mail icon" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                    </div>
                </div>
            </div>

            <hr className="h-px border-0 bg-white/20 max-w-[1400px] mx-auto mt-16 mb-6" />

            <div className="flex justify-center items-center">
                <p className="text-xs md:text-sm font-medium text-white/90">© 2026 SyMon - Device Monitoring System. Made with❤️.</p>
            </div>
        </footer>
    );
};

export default Footer;