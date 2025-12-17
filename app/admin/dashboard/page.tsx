"use client"

import { useEffect, useState, FormEvent } from "react"
import { Plus, Edit, Trash2, Search, Filter, Eye } from "lucide-react"

// --- TYPES & CONSTANTS ---
const API_BASE = "http://127.0.0.1:5000/api/games"

interface Game {
    _id: string; name: string; slug: string;
    dev?: string; release_date?: string; technology?: string;
    platforms?: string[] | string; category?: string;
    thumbnail?: string; image?: string[] | string;
    description?: string; how_to_play?: string;
    link_game?: string; video?: string;
    createdAt?: string; updatedAt?: string;
}

const INITIAL_FORM = {
    name: "", slug: "", dev: "", release_date: "", technology: "",
    platforms: "", thumbnail: "", image: "", link_game: "", video: "",
    category: "", description: "", how_to_play: "",
}

// --- HELPER COMPONENTS (để giảm code lặp trong Modal) ---
const FormInput = ({ label, value, onChange, type = "text", required = false, placeholder = "" }: any) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
        <input
            type={type} value={value} required={required} placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
        />
    </div>
)

const FormTextarea = ({ label, value, onChange, rows = 3 }: any) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
        <textarea
            value={value} rows={rows}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] resize-none"
        />
    </div>
)

// --- MAIN COMPONENT ---
export default function AdminDashboard() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    
    // Modal & Form State
    const [showModal, setShowModal] = useState(false)
    const [currentGame, setCurrentGame] = useState<Game | null>(null)
    const [formData, setFormData] = useState(INITIAL_FORM)

    const getToken = () => localStorage.getItem("adminToken")

    // Fetch Data
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch(API_BASE, { headers: { Authorization: `Bearer ${getToken()}` } })
                if (res.ok) {
                    const json = await res.json()
                    setGames(json?.data ?? json)
                }
            } catch (error) { console.error("Error fetching:", error) } 
            finally { setLoading(false) }
        }
        fetchGames()
    }, [])

    // Helpers
    const updateField = (field: keyof typeof INITIAL_FORM, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const openModal = (game?: Game) => {
        if (game) {
            // Edit Mode
            setCurrentGame(game)
            setFormData({
                ...INITIAL_FORM,
                ...game,
                release_date: game.release_date ? new Date(game.release_date).toISOString().slice(0, 10) : "",
                platforms: Array.isArray(game.platforms) ? game.platforms.join(", ") : (game.platforms || ""),
                image: Array.isArray(game.image) ? game.image.join(", ") : (game.image || ""),
            })
        } else {
            // Create Mode
            setCurrentGame(null)
            setFormData(INITIAL_FORM)
        }
        setShowModal(true)
    }

    const handleDelete = async (slug: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa game này?")) return
        try {
            const res = await fetch(`${API_BASE}/${slug}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            if (res.ok) {
                setGames(prev => prev.filter(g => g.slug !== slug))
                alert("Xóa game thành công!")
            } else alert("Xóa thất bại")
        } catch (error) { alert("Lỗi khi xóa game") }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const isEdit = !!currentGame
        const images = formData.image.split(",").map(s => s.trim()).filter(Boolean)
        const platformsArr = formData.platforms.split(",").map(s => s.trim()).filter(Boolean)

        const payload = {
            ...formData,
            platforms: platformsArr,
            image: images,
            thumbnail: formData.thumbnail || (images[0] ?? undefined),
            release_date: formData.release_date ? new Date(formData.release_date).toISOString() : undefined,
        }

        // Logic gộp
        const url = isEdit ?(`${API_BASE}/${currentGame.slug}`) : API_BASE
        const method = isEdit ? "PUT" : "POST"

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
                body: JSON.stringify(payload),
            })

            if (res.ok) {
                const body = await res.json()
                const data = body.data ?? body
                
                if (isEdit) {
                    setGames(prev => prev.map(g => g._id === data._id ? data : g))
                    alert("Cập nhật thành công!")
                } else {
                    setGames(prev => [...prev, data])
                    alert("Tạo mới thành công!")
                }
                setShowModal(false)
                // Giữ lại logic reload nhẹ nếu cần đồng bộ server side state (optional)
                // setTimeout(() => window.location.reload(), 50) 
            } else {
                alert(`${isEdit ? "Cập nhật" : "Tạo"} thất bại`)
            }
        } catch (error) { alert("Có lỗi xảy ra") }
    }

    const filteredGames = games.filter(g => {
        const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCat = selectedCategory === "all" || (g.category || "").toLowerCase() === selectedCategory.toLowerCase()
        return matchesSearch && matchesCat
    })

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-[#0095BE]/30 border-t-[#0095BE] rounded-full animate-spin"></div>
        </div>
    )

    return (
        <>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#002B50] mb-2">Quản lý Games</h1>
                <p className="text-gray-600">Quản lý toàn bộ games trong hệ thống</p>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text" placeholder="Tìm kiếm game..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] transition-all"
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <select
                                value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] appearance-none bg-white cursor-pointer"
                            >
                                <option value="all">Tất cả danh mục</option>
                                {["IO Games", "Strategy", "Action", "Shooter", "Puzzle", "Racing"].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <button onClick={() => openModal()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00C9FF] to-[#0095BE] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all">
                            <Plus size={20} /> Tạo Game Mới
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-[#002B50] to-[#003D6B] text-white">
                            <tr>
                                {["Hình ảnh", "Tên Game", "Nhà phát triển", "Slug", "Danh mục", "Ngày tạo", "Thao tác"].map(h => 
                                    <th key={h} className="px-6 py-4 text-left text-sm font-bold first:text-left last:text-center">{h}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredGames.length === 0 ? (
                                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">Không tìm thấy game nào</td></tr>
                            ) : filteredGames.map((game) => {
                                const imgUrl = game.thumbnail || (Array.isArray(game.image) ? game.image[0] : game.image);
                                return (
                                    <tr key={game._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            {imgUrl ? (
                                                <img src={imgUrl} alt={game.name} className="w-16 h-16 object-cover rounded-lg shadow" />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"><Eye size={24} className="text-gray-400" /></div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{game.name}</td>
                                        <td className="px-6 py-4"><code className="text-sm bg-gray-100 px-2 py-1 rounded break-all">{game.dev}</code></td>
                                        <td className="px-6 py-4"><code className="text-sm bg-gray-100 px-2 py-1 rounded">{game.slug}</code></td>
                                        <td className="px-6 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{game.category || "N/A"}</span></td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">{game.createdAt ? new Date(game.createdAt).toLocaleDateString("vi-VN") : "N/A"}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => openModal(game)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200" title="Sửa"><Edit size={18} /></button>
                                                <button onClick={() => game.slug && handleDelete(game.slug)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Xóa"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-[#002B50] to-[#003D6B] text-white px-6 py-4 rounded-t-2xl">
                            <h2 className="text-2xl font-bold">{currentGame ? "Chỉnh sửa Game" : "Tạo Game Mới"}</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <FormInput label="Tên Game" value={formData.name} onChange={(v: string) => updateField("name", v)} required />
                            <FormInput label="Slug" value={formData.slug} onChange={(v: string) => updateField("slug", v)} required />
                            <FormInput label="URL Hình ảnh (cách nhau bởi dấu phẩy)" value={formData.image} onChange={(v: string) => updateField("image", v)} />
                            <FormInput label="Thumbnail URL" value={formData.thumbnail} onChange={(v: string) => updateField("thumbnail", v)} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput label="Nhà phát triển" value={formData.dev} onChange={(v: string) => updateField("dev", v)} />
                                <FormInput type="date" label="Release Date" value={formData.release_date} onChange={(v: string) => updateField("release_date", v)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput label="Công nghệ" value={formData.technology} onChange={(v: string) => updateField("technology", v)} />
                                <FormInput label="Platforms (cách nhau ,)" value={formData.platforms} onChange={(v: string) => updateField("platforms", v)} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Danh mục</label>
                                <select value={formData.category} onChange={(e) => updateField("category", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]">
                                    <option value="">Chọn danh mục</option>
                                    {["IO Games", "Strategy", "Action", "Shooter", "Puzzle", "Racing"].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <FormTextarea label="Mô tả" value={formData.description} onChange={(v: string) => updateField("description", v)} />
                            <FormTextarea label="How to play" value={formData.how_to_play} onChange={(v: string) => updateField("how_to_play", v)} rows={2} />
                            <FormInput label="Link game" value={formData.link_game} onChange={(v: string) => updateField("link_game", v)} />
                            <FormInput label="Video URL" value={formData.video} onChange={(v: string) => updateField("video", v)} />

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="flex-1 bg-gradient-to-r from-[#00C9FF] to-[#0095BE] text-white font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all">
                                    {currentGame ? "Cập nhật" : "Tạo Game"}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300">
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}