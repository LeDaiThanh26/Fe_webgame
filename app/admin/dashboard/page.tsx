"use client"

import { useEffect, useState } from "react"
// AdminHeader is provided by `app/admin/layout.tsx` so don't import it here
import { Plus, Edit, Trash2, Search, Filter, Eye } from "lucide-react"

interface Game {
    _id: string
    name: string
    dev?: string
    release_date?: string
    last_update?: string
    technology?: string
    platforms?: string[]
    category?: string
    thumbnail?: string
    description?: string
    how_to_play?: string
    image?: string[]
    link_game?: string
    video?: string
    createdAt?: string
    updatedAt?: string
    slug?: string
    __v?: number
}

export default function AdminDashboard() {
    const API_BASE = "http://127.0.0.1:5000/api/games"
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState<"create" | "edit">("create")
    const [currentGame, setCurrentGame] = useState<Game | null>(null)

    // Form states (expanded to match game model)
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        dev: "",
        release_date: "",
        technology: "",
        platforms: "", // comma-separated in input; converted to array on submit
        thumbnail: "",
        image: "", // comma-separated URLs -> converted to array on submit
        link_game: "",
        video: "",
        category: "",
        description: "",
        how_to_play: "",
    })

    // Fetch games từ API
    useEffect(() => {
        fetchGames()
    }, [])

    const fetchGames = async () => {
        try {
            const token = localStorage.getItem("adminToken")
            const res = await fetch(`${API_BASE}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.ok) {
                const json = await res.json()
                // API returns { data: [...] } — support both shapes
                const list = json?.data ?? json
                setGames(list)
            } else {
                console.error("Failed to fetch games, status:", res.status)
            }
        } catch (error) {
            console.error("Error fetching games:", error)
        } finally {
            setLoading(false)
        }
    }

    // helper to unwrap API responses that may be { data: ... }
    const unwrap = (json: any) => (json && json.data ? json.data : json)

    const handleCreate = () => {
        setModalMode("create")
        setFormData({
            name: "",
            slug: "",
            dev: "",
            release_date: "",
            technology: "",
            platforms: "",
            thumbnail: "",
            image: "",
            link_game: "",
            video: "",
            category: "",
            description: "",
            how_to_play: "",
        })
        setShowModal(true)
    }

    const handleEdit = (game: Game) => {
        setModalMode("edit")
        setCurrentGame(game)
        setFormData({
            name: game.name,
            slug: game.slug,
            dev: (game as any).dev || "",
            release_date: game.release_date ? new Date(game.release_date).toISOString().slice(0, 10) : "",
            technology: (game as any).technology || "",
            platforms: Array.isArray((game as any).platforms) ? (game as any).platforms.join(", ") : ((game as any).platforms || ""),
            thumbnail: (game as any).thumbnail || "",
            image: Array.isArray(game.image) ? game.image.join(", ") : (game.image as string) || "",
            link_game: (game as any).link_game || "",
            video: (game as any).video || "",
            category: game.category || "",
            description: game.description || "",
            how_to_play: (game as any).how_to_play || "",
        })
        setShowModal(true)
    }

    const handleDelete = async (slug: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa game này?")) return

        try {
            const token = localStorage.getItem("adminToken")
            // delete by slug
            const res = await fetch(`${API_BASE}/${slug}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                setGames(games.filter((g) => g.slug !== slug))
                alert("Xóa game thành công!")
            } else {
                console.error("Delete failed, status:", res.status)
                alert("Xóa thất bại")
            }
        } catch (error) {
            console.error("Error deleting game:", error)
            alert("Có lỗi xảy ra khi xóa game")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("adminToken")

        try {
            // prepare images and platforms arrays
            const images = formData.image ? formData.image.split(",").map((s) => s.trim()).filter(Boolean) : []
            const platformsArr = formData.platforms ? formData.platforms.split(",").map((s) => s.trim()).filter(Boolean) : []

            const payload: any = {
                name: formData.name,
                slug: formData.slug,
                dev: formData.dev || undefined,
                release_date: formData.release_date ? new Date(formData.release_date).toISOString() : undefined,
                technology: formData.technology || undefined,
                platforms: platformsArr,
                category: formData.category || undefined,
                thumbnail: formData.thumbnail || (images[0] ?? undefined),
                description: formData.description || undefined,
                how_to_play: formData.how_to_play || undefined,
                image: images,
                link_game: formData.link_game || undefined,
                video: formData.video || undefined,
            }

            if (modalMode === "create") {
                const res = await fetch("http://localhost:5000/api/games", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                })

                if (res.ok) {
                    const body = await res.json()
                    const newGame = unwrap(body)
                    setGames([...games, newGame])
                    alert("Tạo game mới thành công!")
                    setShowModal(false)
                } else {
                    console.error("Create game failed, status:", res.status)
                    alert("Tạo game thất bại")
                }
            } else {
                // update by slug (send slug with payload to /slug)
                const identifier = currentGame?.slug; // Lấy slug hiện tại của game đang sửa
                const res = await fetch(`${API_BASE}/${identifier}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (res.ok) {
                    const body = await res.json()
                    const updatedGame = unwrap(body)
                    setGames(games.map((g) => (g._id === updatedGame._id ? updatedGame : g)))
                    alert("Cập nhật game thành công!")
                    setShowModal(false)
                } else {
                    console.error("Update game failed, status:", res.status)
                    alert("Cập nhật thất bại")
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            alert("Có lỗi xảy ra")
        }
    }

    // Filter games
    const filteredGames = games.filter((game) => {
        const matchSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchCategory = selectedCategory === "all" || game.category === selectedCategory
        return matchSearch && matchCategory
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-[#0095BE]/30 border-t-[#0095BE] rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <>
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#002B50] mb-2">Quản lý Games</h1>
                <p className="text-gray-600">Quản lý toàn bộ games trong hệ thống</p>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm game..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] transition-all"
                        />
                    </div>

                    {/* Filter & Create */}
                    <div className="flex gap-3">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] transition-all appearance-none bg-white cursor-pointer"
                            >
                                <option value="all">Tất cả danh mục</option>
                                <option value="action">Action</option>
                                <option value="puzzle">Puzzle</option>
                                <option value="racing">Racing</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>

                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00C9FF] to-[#0095BE] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            <Plus size={20} />
                            Tạo Game Mới
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <p className="text-blue-100 text-sm mb-1">Tổng số games</p>
                    <p className="text-4xl font-bold">{games.length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                    <p className="text-green-100 text-sm mb-1">Đang hiển thị</p>
                    <p className="text-4xl font-bold">{filteredGames.length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <p className="text-purple-100 text-sm mb-1">Danh mục</p>
                    <p className="text-4xl font-bold">4</p>
                </div>
            </div>

            {/* Games Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-[#002B50] to-[#003D6B] text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold">Hình ảnh</th>
                                <th className="px-6 py-4 text-left text-sm font-bold">Tên Game</th>
                                <th className="px-6 py-4 text-left text-sm font-bold">ID</th>
                                <th className="px-6 py-4 text-left text-sm font-bold">Slug</th>
                                <th className="px-6 py-4 text-left text-sm font-bold">Danh mục</th>
                                <th className="px-6 py-4 text-left text-sm font-bold">Ngày tạo</th>
                                <th className="px-6 py-4 text-center text-sm font-bold">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredGames.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                        Không tìm thấy game nào
                                    </td>
                                </tr>
                            ) : (
                                filteredGames.map((game) => (
                                    <tr key={game._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            {(
                                                game.thumbnail ||
                                                (Array.isArray(game.image) ? game.image[0] : game.image)
                                            ) ? (
                                                <img
                                                    src={
                                                        game.thumbnail ||
                                                        (Array.isArray(game.image) ? game.image[0] : (game.image as string))
                                                    }
                                                    alt={game.name}
                                                    className="w-16 h-16 object-cover rounded-lg shadow"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <Eye size={24} className="text-gray-400" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-800">{game.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-sm bg-gray-100 px-2 py-1 rounded break-all">{game._id}</code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{game.slug}</code>
                                                <button
                                                    type="button"
                                                    onClick={() => { navigator.clipboard?.writeText(game.slug || "") }}
                                                    title="Copy slug"
                                                    className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                {game.category || "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {game.createdAt
                                                ? new Date(game.createdAt).toLocaleDateString("vi-VN")
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(game)}
                                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                                    title="Sửa"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => game.slug && handleDelete(game.slug)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                    title="Xóa"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-[#002B50] to-[#003D6B] text-white px-6 py-4 rounded-t-2xl">
                            <h2 className="text-2xl font-bold">
                                {modalMode === "create" ? "Tạo Game Mới" : "Chỉnh sửa Game"}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên Game</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">URL Hình ảnh (cách nhau bởi dấu phẩy)</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail URL</label>
                                <input
                                    type="text"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nhà phát triển (dev)</label>
                                <input
                                    type="text"
                                    value={formData.dev}
                                    onChange={(e) => setFormData({ ...formData, dev: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Release date</label>
                                <input
                                    type="date"
                                    value={formData.release_date}
                                    onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Công nghệ</label>
                                <input
                                    type="text"
                                    value={formData.technology}
                                    onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Platforms (cách nhau bởi dấu phẩy)</label>
                                <input
                                    type="text"
                                    value={formData.platforms}
                                    onChange={(e) => setFormData({ ...formData, platforms: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Danh mục</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                >
                                    <option value="">Chọn danh mục</option>
                                    <option value="action">Action</option>
                                    <option value="puzzle">Puzzle</option>
                                    <option value="racing">Racing</option>
                                    <option value="sports">Sports</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">How to play</label>
                                <textarea
                                    value={formData.how_to_play}
                                    onChange={(e) => setFormData({ ...formData, how_to_play: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Link game</label>
                                <input
                                    type="text"
                                    value={formData.link_game}
                                    onChange={(e) => setFormData({ ...formData, link_game: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Video URL</label>
                                <input
                                    type="text"
                                    value={formData.video}
                                    onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-[#00C9FF] to-[#0095BE] text-white font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                                >
                                    {modalMode === "create" ? "Tạo Game" : "Cập nhật"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
                                >
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
