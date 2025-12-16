"use client"
import {useState,useEffect} from 'react'
import { Search, ChevronLeft, X} from "lucide-react"
import GameCard from "./GameCard"


export default function Sidebar({
        isMobile,
        isSearchOpen,
        setIsSearchOpen
    }:{
        isMobile:boolean,
        isSearchOpen:boolean,
        setIsSearchOpen:React.Dispatch<React.SetStateAction<boolean>>;
    }

){
    const [searchQuery, setSearchQuery] = useState("")
    // ---- KHOÁ SCROLL KHI MỞ SIDEBAR ----
    useEffect(() => {
        document.body.style.overflow = isSearchOpen ? "hidden" : "auto"
    }, [isSearchOpen])

    const recentGames = [...Array(12)].map((_, i) => ({
        image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
        video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
        title: "Game " + (i + 1),
        href: "#",
        issidebar: true,
        isRecentPlay:true
    }))
    const PopularGames = [...Array(12)].map((_, i) => ({
        image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23/yohoho-io.jpeg",
        video: "https://v.poki-cdn.com/e89995ba-0b2e-4dde-b1e0-e10f4897a168/thumbnail.2x2.vp9.mp4",
        title: "Game " + (i + 1),
        href: "#",
        issidebar: true,
    }))
    return (
        <>
            {/* ---------- OVERLAY (CLICK ĐỂ ĐÓNG) ---------- */}
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[90]"
                    onClick={() => {
                        setIsSearchOpen(false)
                        setSearchQuery("")
                    }}
                />
            )}
            <div
                className={`fixed top-0 left-0 h-full bg-[#00ffee] shadow-2xl z-[100] 
                    transition-transform duration-300 ease-in-out 
                    ${isSearchOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${isMobile ? 'w-full' : 'w-[700px]'}
                `}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Search box */}
                    <div className="mb-8">
                        <div className="relative bg-white rounded-full shadow-lg mr-6">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2">
                                <div className="w-8 h-8 bg-[#002B50] rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="What are you playing today?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-14 py-4 rounded-full focus:outline-none font-bold text-black-500"
                            />
                            <button 
                                className="absolute cursor-pointer right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setSearchQuery("")}
                            >
                                {searchQuery ? <X size={24} /> : <Search size={24} />}
                            </button>
                        </div>
                    </div>
                
                    {isSearchOpen  &&(
                        <button
                            onClick={() => {
                                setIsSearchOpen(false)
                                setSearchQuery("")
                            }}
                            className="absolute cursor-pointer top-6 -right-7 p-[14px] bg-white rounded-full hover:scale-110 transition-transform duration-200 shadow-md"
                        >
                            <ChevronLeft size={28} className="text-[#002B50]" />
                        </button>
                        )}
                    
                
                    {/* Recently Played */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#002B50] mb-4">Recently played</h2>
                        <div className="grid grid-cols-6 gap-5">
                            {recentGames.map((game, index) => (
                                <GameCard key={index} {...game} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl mt-10 font-bold text-[#002B50] mb-4">Popular this week
                        </h2>
                        <div className="grid grid-cols-6 gap-2">
                            {PopularGames.map((game, index) => (
                                <GameCard key={index} {...game} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}
