"use client"
import Image from "next/image"
import { Search, Facebook, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import Sidebar from "./sidebar"
import AuthModal from "./Auth/auth"
import { useRouter } from 'next/navigation';

export default function Header() {
  const [windowWidth, setWindowWidth] = useState(1860)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router=useRouter();
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = windowWidth < 1300

  const bgClass = isScrolled
  ? "bg-[#002B50]/95 backdrop-blur shadow-xl"
  : "bg-gradient-to-b from-white to-gray-50 shadow-lg"

  const iconColor = isScrolled ? "text-white" : "text-[#002B50]"

  const buttonClass = isScrolled
    ? "bg-white text-[#002B50] hover:bg-gray-100"
    : "bg-[#0095BE] text-white hover:bg-[#007a9e]"


  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${bgClass}`}
      >
        <div className="flex items-center justify-between mx-auto px-[20px] py-4 max-w-[1860px]">
          
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 cursor-pointer rounded-full transition-colors hover:bg-black/10 ${iconColor}`}
            >
              <Search size={isMobile ? 20 : 24} />
            </button>
            
            <Image
              src={isScrolled?"/icon_daonguoc.png":"/icon5.png"}
              alt="GameZone Logo"
              width={isMobile ? 150 : 140}
              height={isMobile ? 50 : 70}
              className="object-contain cursor-pointer"
              onClick={()=>{router.push('/')}}
            />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className={`p-2 rounded-full transition-colors cursor-pointer hover:bg-black/10 ${iconColor}`}
            >
              <Facebook size={isMobile ? 20 : 24} />
            </a>

            <button
              className={`p-2 rounded-full transition-colors cursor-pointer hover:bg-black/10 ${iconColor}`}
            >
              <Heart size={isMobile ? 20 : 24} />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className={`font-bold cursor-pointer rounded-md transition-all duration-300 shadow-md
                ${isMobile ? "px-4 py-2 text-sm" : "px-6 py-2.5 text-base"}
                ${buttonClass}
              `}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </header>

      {/* SEARCH SIDEBAR */}
      <Sidebar
        isSearchOpen={isSearchOpen}
        isMobile={isMobile}
        setIsSearchOpen={setIsSearchOpen}
      />

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
