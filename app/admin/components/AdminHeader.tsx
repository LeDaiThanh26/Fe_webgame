"use client"

import Image from "next/image"
import { LogOut, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AdminInfo {
    _id: string
    name: string
    account: string
}

export default function AdminHeader() {
    const [admin, setAdmin] = useState<AdminInfo | null>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // Lấy thông tin admin khi component mount
    useEffect(() => {
        const fetchAdminInfo = async () => {
            const token = localStorage.getItem("adminToken")
            if (!token) {
                router.push("/admin/login")
                return
            }

            try {
                const res = await fetch("http://localhost:5000/api/admin/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.ok) {
                    const data = await res.json()
                    setAdmin(data)
                } else {
                    // Token không hợp lệ
                    localStorage.removeItem("adminToken")
                    router.push("/admin/login")
                }
            } catch (error) {
                console.error("Error fetching admin info:", error)
                router.push("/admin/login")
            }
        }

        fetchAdminInfo()
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("adminToken")
        // Navigate to login and force a reload so header state resets immediately
        router.push("/admin/login")
        try {
            // small timeout to allow router.push to start navigation
            setTimeout(() => window.location.reload(), 50)
        } catch (e) {
            // fallback: set location directly
            window.location.href = "/admin/login"
        }
    }

    const bgClass = isScrolled
        ? "bg-[#002B50]/95 backdrop-blur shadow-xl"
        : "bg-gradient-to-b from-white to-gray-50 shadow-lg"

    const iconColor = isScrolled ? "text-white" : "text-[#002B50]"

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${bgClass}`}>
            <div className="flex items-center justify-between mx-auto px-[20px] py-4 max-w-[1860px]">

                {/* Logo Section */}
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${isScrolled ? "bg-white/10" : "bg-[#002B50]/5"}`}>
                        <Shield size={24} className={iconColor} />
                    </div>

                    <Image
                        src={isScrolled ? "/icon_daonguoc.png" : "/icon5.png"}
                        alt="Admin Logo"
                        width={140}
                        height={70}
                        className="object-contain cursor-pointer"
                        onClick={() => router.push("/admin/dashboard")}
                    />

                    <div className={`ml-2 ${isScrolled ? "text-white" : "text-[#002B50]"}`}>
                        <h1 className="font-bold text-lg">Admin Panel</h1>
                        <p className="text-xs opacity-70">Quản trị hệ thống</p>
                    </div>
                </div>

                {/* Admin Info & Logout */}
                <div className="flex items-center gap-4">
                    {admin && (
                        <>
                            <div className={`text-right ${isScrolled ? "text-white" : "text-[#002B50]"}`}>
                                <p className="font-bold text-sm">Hi, {admin.name}</p>
                                <p className="text-xs opacity-70">@{admin.account}</p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                title="Đăng xuất"
                            >
                                <LogOut size={18} />
                                <span className="font-medium text-sm">Đăng xuất</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
