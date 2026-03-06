"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg--primary text-white py-16 px-4 md:px-12 w-full">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
                {/* left section */}
                <div className="flex-1 max-w-sm">
                    <div className="space-y-1 text-sm font-medium">
                        <p>Departemen Teknik Elektro dan Informatika</p>
                        <p>Sekolah Vokasi</p>
                        <p>Universitas Gadjah Mada</p>
                        <p className="pb-1">Jl. Yacaranda, Sekip Unit III, Yogyakarta. 55281</p>
                        <div className="flex items-center gap-2 pt-1">
                            <Image
                                src="/images/mailIcon.svg"
                                alt="mail icon"
                                width={20}
                                height={20}
                            />
                            <a href="mailto:tedi.sv@ugm.ac.id" className="hover:text-gray-200 transition-colors">
                                tedi.sv@ugm.ac.id
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/callIcon.svg"
                                alt="call icon"
                                width={20}
                                height={20}
                            />
                            <div className="flex items-center gap-2">
                                <span>(0274) 6491302, 561111</span>
                                <span>|</span>
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/images/telephone.svg"
                                        alt="call icon"
                                        width={20}
                                        height={20}
                                    />
                                    <span>(0274) 542908</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* center section */}
                <div className="flex-1 md:flex-none md:w-48">
                    <h3 className="text-xl font-bold text-white mb-6">Company</h3>
                    <ul className="space-y-2 text-sm font-medium">
                        <li>
                            <Link href="/dashboard" className="hover:text-white hover:underline transition-colors">
                                About SyMon
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:text-white hover:underline transition-colors">
                                Our Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:text-white hover:underline transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:text-white hover:underline transition-colors">
                                FAQ
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* right section */}
                <div className="flex-1 md:flex-none md:w-48">
                    <h3 className="text-xl font-bold text-white mb-6">Contact</h3>
                    <div className="flex items-center gap-4">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <Image
                                src="/images/instagram.svg"
                                alt="call icon"
                                width={20}
                                height={20}
                            />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <Image
                                src="/images/linkedin.svg"
                                alt="call icon"
                                width={20}
                                height={20}
                            />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <Image
                                src="/images/instagram.svg"
                                alt="call icon"
                                width={20}
                                height={20}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;