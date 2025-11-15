"use client"
import Image from "next/image"
import {Search, Facebook, Heart} from "lucide-react"
import { useEffect, useState } from 'react'
import Sidebar from "./sidebar"
export default function Header() {
    const [windowWidth, setWindowWidth] = useState(1860)
    const [isSearchOpen, setIsSearchOpen] = useState(false)


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isMobile = windowWidth < 1300

    return (
        <>
            <header className="w-full bg-white shadow-md relative z-50">
                <div className={`flex items-center justify-between mx-auto px-[20px] py-4 max-w-[1860px] ${isMobile ? 'gap-4' : ''}`}>
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Search size={isMobile ? 20 : 24} className="text-[#002B50]" />
                        </button>
                        <Image
                            src="/icon.png"
                            alt="GameZone Logo"
                            width={isMobile ? 50 : 70}
                            height={isMobile ? 50 : 70}
                            className="object-contain"
                        />
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <a href="#" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Facebook size={isMobile ? 20 : 24} className="text-[#002B50]" />
                        </a>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                            <Heart size={isMobile ? 20 : 24} className="text-[#002B50]" />
                        </button>
                        <button className={`${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-2.5 text-base'} bg-[#0095BE] text-white font-bold rounded-md hover:bg-[#007a9e] transition-all duration-300 shadow-md`}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </header>
            <Sidebar 
                isSearchOpen={isSearchOpen} 
                isMobile={isMobile}
                setIsSearchOpen={setIsSearchOpen} />
        </>
    )
}
