"use client"
import Image from "next/image"
import { Facebook, Instagram, Youtube, ChevronDown } from "lucide-react"
import { useEffect, useState } from 'react'
import { VN } from 'country-flag-icons/react/3x2'

export default function Footer(){
    const [windowWidth, setWindowWidth] = useState(1860)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Desktop: zigzag như cũ
    const zigzagWidthPx = 50
    let centerPx = windowWidth * 0.40 
    if(windowWidth > 2300){
        centerPx = windowWidth * 0.45
    }

    const pos1 = `${centerPx - zigzagWidthPx / 2}px`
    const pos2 = `${centerPx + zigzagWidthPx / 2}px`
    const pos3 = `${centerPx + zigzagWidthPx * 1.1}px`
    const pos4 = `${centerPx - zigzagWidthPx * 1.1}px`
    const isMobile = windowWidth < 1300


    // Footer desktop với zigzag
    return (
        <footer className={`flex items-end justify-center w-full ${isMobile?'h-[570px]':'h-[457px]'} relative bg-[#FFFFFF] overflow-hidden`}
            style={{ 
                clipPath: `polygon(${isMobile?`
                    0% 10%, 
                    95% 0%,
                    100% 5%, 
                    100% 100%, 
                    0% 100%`:
                    `0% 25%, 
                    ${pos1} 20%, 
                    ${pos2} 25%, 
                    100% 0%, 
                    100% 100%, 
                    0% 100%`}
                   
                )`
            }}>
            <div className="absolute top-0 left-0 w-full h-full z-0"
                style={{
                    background: '#F0F5FC',
                    clipPath: `polygon(${isMobile?
                        `95% 0%,
                         100% 5%, 
                         100% 100%,
                         90% 100%`:
                        `${pos1} 20%, 
                        ${pos2} 25%, 
                        ${pos3} 100%,
                        ${pos4} 100%`})`
                }}>
            </div>
            
            <div className={`flex ${isMobile ? 'flex-col gap-10' : 'justify-between'} mx-[20px] w-full max-w-[1860px] pb-15 z-10 text-[#002B50] relative`}>
                <div className={`flex flex-col gap-4 ${isMobile ? 'w-[800px]' : 'w-[400px] ml-20'}`}>
                    <div className="flex items-center gap-2">
                        <Image
                            src="/icon5.png"
                            alt="logo"
                            width={120}
                            height={120}
                            className="object-contain"
                        />
                        <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold`}>Cổng game trực tuyến miễn phí</h2>
                    </div>
                    <p className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                        GameZone mang đến cho bạn hàng ngàn trò chơi trực tuyến hấp dẫn,
                        đa dạng thể loại như phiêu lưu, trí tuệ, hành động, thể thao, và giải trí nhẹ nhàng.
                        Chơi ngay không cần tải xuống – chỉ cần một cú nhấp chuột!
                    </p>
                    <button className="flex items-center gap-2 px-4 py-2 w-fit cursor-pointer text-[#0095BE] border-2 border-[#0095BE] rounded-md hover:bg-[#0095BE] hover:text-white transition-all duration-300 group">
                        <VN className="w-5 h-5" />
                        <span className={`${isMobile ? 'text-sm' : 'text-[16px]'} font-bold`}>Việt Nam</span>
                        <ChevronDown size={25} className="text-[#0095BE] group-hover:text-white transition-colors duration-300" />
                    </button>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-blue-600 transition-colors">
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="hover:text-pink-600 transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="hover:text-red-600 transition-colors">
                            <Youtube size={24} />
                        </a>
                    </div>
                </div>
                <div className={`flex w-[600px] gap-40`}>
                    <div className="flex flex-col gap-2.5">
                        <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>Liên kết nhanh</h3>
                        <a className={`${isMobile ? 'text-sm' : 'text-[17px]'} font-medium hover:text-blue-600 transition-colors`} href="/trangchu">Trang chủ</a>
                        <a className={`${isMobile ? 'text-sm' : 'text-[17px]'} font-medium hover:text-blue-600 transition-colors`} href="/danhmuc">Danh mục game</a>
                        <a className={`${isMobile ? 'text-sm' : 'text-[17px]'} font-medium hover:text-blue-600 transition-colors`} href="/gamemoi">Game mới</a>
                        <a className={`${isMobile ? 'text-sm' : 'text-[17px]'} font-medium hover:text-blue-600 transition-colors`} href="/thinhanh">Game thịnh hành</a>
                        <a className={`${isMobile ? 'text-sm' : 'text-[17px]'} font-medium hover:text-blue-600 transition-colors`} href="/lienhe">Liên hệ</a>
                    </div>
                    
                    <div className="flex flex-col gap-2.5">
                        <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>Chính sách & Hỗ trợ</h3>
                        <a className={`${isMobile ? 'text-sm' : 'text-[17px]'} font-medium hover:text-blue-600 transition-colors`} href="/danhmuc">Điều khoản sử dụng</a>
                        <a className={`${isMobile ? 'text-sm' : 'text-[17px]'} font-medium hover:text-blue-600 transition-colors`} href="/gamemoi">Chính sách bảo mật</a>
                        <a className={`${isMobile ? 'text-sm' : 'text-[17px]'} font-medium hover:text-blue-600 transition-colors`} href="/thinhanh">Báo lỗi game</a>
                        <a className={`${isMobile ? 'text-sm' : 'text-[17px]'} font-medium hover:text-blue-600 transition-colors`} href="/lienhe">Hướng dẫn sử dụng</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}