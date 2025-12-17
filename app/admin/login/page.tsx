"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account, password }),
            })

            const data = await res.json()

            if (res.ok) {
                localStorage.setItem("adminToken", data.token)
                        router.push("/admin/dashboard")
                        try {
                            setTimeout(() => window.location.reload(), 50)
                        } catch (e) {
                            window.location.href = "/admin/dashboard"
                        }
            } else {
                setError(data.message || "Đăng nhập thất bại")
            }
        } catch {
            setError("Không thể kết nối đến server")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                <h1 className="text-xl font-semibold text-center mb-6">
                    Admin Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Tài khoản</label>
                        <input
                            type="text"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    )
}
