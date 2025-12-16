"use client"
import { useState, useEffect } from 'react'
import { Search, ChevronLeft, X } from "lucide-react"
import GameCard from "./GameCard"

type FavouriteGame = {
    _id: string;
    name: string;
    thumbnail: string;
    video: string;
    slug: string;
}

export default function Sidebar({
    isMobile,
    isSearchOpen,
    setIsSearchOpen
}: {
    isMobile: boolean,
    isSearchOpen: boolean,
    setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

) {
    const [searchQuery, setSearchQuery] = useState("")
    const [favouriteGames, setFavouriteGames] = useState<FavouriteGame[]>([])
    const [recommendedGames, setRecommendedGames] = useState<FavouriteGame[]>([])
    const [searchResults, setSearchResults] = useState<FavouriteGame[]>([])
    const [isSearching, setIsSearching] = useState(false)

    // ---- KHOÁ SCROLL KHI MỞ SIDEBAR ----
    useEffect(() => {
        document.body.style.overflow = isSearchOpen ? "hidden" : "auto"
    }, [isSearchOpen])

    // ---- LẤY GAME GẦN ĐÂY (state) ----
    const [recentGames, setRecentGames] = useState<FavouriteGame[]>([])

    // ---- LẤY DATA USER (Recent + Favourite) ----
    useEffect(() => {
        const fetchUserData = async () => {
            const token = typeof window !== "undefined" ? localStorage.getItem('token') : null
            if (!token) return

            try {
                // Lấy thông tin user hiện tại
                const userRes = await fetch('http://localhost:5000/api/users/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (!userRes.ok) return

                const user = await userRes.json()

                // [1] Lấy danh sách favourite
                try {
                    const favRes = await fetch(`http://localhost:5000/api/favourites/user/${user._id}`)
                    if (favRes.ok) {
                        const favData = await favRes.json()
                        const games: FavouriteGame[] = favData.data
                            .map((f: any) => f.id_game)
                            .filter((g: any) => !!g && g.thumbnail && g.slug)
                            .map((g: any) => ({
                                _id: g._id,
                                name: g.name,
                                thumbnail: g.thumbnail,
                                video: g.video,
                                slug: g.slug,
                            }))
                        setFavouriteGames(games)
                    }
                } catch (err) {
                    console.error("Lỗi lấy game yêu thích:", err)
                }

                // [2] Lấy danh sách game gần đây (NEW)
                try {
                    console.log("Fetching recents for user:", user._id);
                    const recentsRes = await fetch(`http://localhost:5000/api/recents/${user._id}`)
                    console.log("Recents API status:", recentsRes.status);

                    if (recentsRes.ok) {
                        const recentsData = await recentsRes.json()
                        console.log("Recents API raw response:", recentsData);

                        // Xử lý trường hợp API trả về mảng trực tiếp hoặc object { data: [...] }
                        const rawList = Array.isArray(recentsData) ? recentsData : (recentsData.data || []);

                        const games: FavouriteGame[] = rawList
                            .map((r: any) => {
                                // Kiểm tra cấu trúc populate, có thể là r.id_game, r.game, hoặc r chính là game
                                const gameInfo = r.id_game || r.game || r;
                                return gameInfo;
                            })
                            .filter((g: any) => !!g && g.thumbnail && g.slug)
                            .map((g: any) => ({
                                _id: g._id,
                                name: g.name,
                                thumbnail: g.thumbnail,
                                video: g.video,
                                slug: g.slug,
                            }))

                        console.log("Processed recent games list:", games);
                        setRecentGames(games)
                    } else {
                        console.error("Failed to fetch recents:", recentsRes.statusText);
                    }
                } catch (err) {
                    console.error("Lỗi exception lấy game gần đây:", err)
                }

            } catch (error) {
                console.error("Lỗi lấy thông tin user:", error)
            }
        }

        fetchUserData()
    }, [])

    // ---- LẤY 12 GAME ĐỀ XUẤT NGẪU NHIÊN ----
    useEffect(() => {
        const fetchRandomGames = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/games/random-12', {
                    cache: 'no-store'
                })
                if (!res.ok) return
                const json = await res.json()
                const games: FavouriteGame[] = (json.data || [])
                    .filter((g: any) => g.thumbnail && g.slug)
                    .map((g: any) => ({
                        _id: g._id,
                        name: g.name,
                        thumbnail: g.thumbnail,
                        video: g.video,
                        slug: g.slug,
                    }))
                setRecommendedGames(games)
            } catch (err) {
                console.error("Lỗi lấy game đề xuất:", err)
            }
        }

        fetchRandomGames()
    }, [])

    // ---- TÌM KIẾM GAME THEO TÊN ----
    useEffect(() => {
        // nếu không có query thì clear kết quả tìm kiếm
        if (!searchQuery.trim()) {
            setSearchResults([])
            setIsSearching(false)
            return
        }

        let active = true
        const timeout = setTimeout(async () => {
            try {
                setIsSearching(true)
                const res = await fetch('http://localhost:5000/api/games/')
                if (!res.ok) return
                const json = await res.json()

                const allGames = json.data || []
                const q = searchQuery.toLowerCase()

                const filtered: FavouriteGame[] = allGames
                    .filter((g: any) => g.name?.toLowerCase().includes(q))
                    .map((g: any) => ({
                        _id: g._id,
                        name: g.name,
                        thumbnail: g.thumbnail,
                        video: g.video,
                        slug: g.slug,
                    }))

                if (active) {
                    setSearchResults(filtered)
                }
            } catch (err) {
                console.error("Lỗi tìm kiếm game:", err)
            } finally {
                if (active) setIsSearching(false)
            }
        }, 400) // debounce 400ms

        return () => {
            active = false
            clearTimeout(timeout)
        }
    }, [searchQuery])
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
                <div className="flex flex-col h-full p-6 overflow-y-auto no-scrollbar">
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
                                placeholder="Bạn muốn tìm game gì?"
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

                    {isSearchOpen && (
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

                    {/* Nếu đang tìm kiếm thì show kết quả search, ngược lại show Recently + Yêu thích */}
                    {searchQuery.trim() ? (
                        <div className="flex-1 overflow-y-auto">
                            <h2 className="text-2xl font-bold text-[#002B50] mb-4">
                                Kết quả tìm kiếm
                            </h2>
                            {isSearching && (
                                <p className="text-sm text-[#002B50] mb-2">Đang tìm kiếm...</p>
                            )}
                            {!isSearching && searchResults.length === 0 && (
                                <p className="text-sm text-[#002B50] mb-2">
                                    Không tìm thấy game nào phù hợp.
                                </p>
                            )}
                            <div className="grid grid-cols-6 gap-4">
                                {searchResults.map((game) => (
                                    <GameCard
                                        key={game._id}
                                        image={game.thumbnail}
                                        video={game.video}
                                        title={game.name}
                                        slug={game.slug}
                                        issidebar={true}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Game đề xuất (random 12) - Moved to Top */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#002B50] mb-4">
                                    Game đề xuất
                                </h2>
                                {recommendedGames.length === 0 ? (
                                    <p className="text-sm text-[#002B50]">
                                        Đang tải danh sách game đề xuất...
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-6 gap-2">
                                        {recommendedGames.map((game) => (
                                            <GameCard
                                                key={game._id}
                                                image={game.thumbnail}
                                                video={game.video}
                                                title={game.name}
                                                slug={game.slug}
                                                issidebar={true}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Recently Played - Moved to Second */}
                            <div>
                                <h2 className="text-2xl mt-10 font-bold text-[#002B50] mb-4">Game vừa chơi</h2>
                                {recentGames.length === 0 ? (
                                    <p className="text-sm text-[#002B50] col-span-6">
                                        Chưa có game chơi gần đây.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-6 gap-5">
                                        {recentGames.map((game) => (
                                            <GameCard
                                                key={game._id}
                                                image={game.thumbnail}
                                                video={game.video}
                                                title={game.name}
                                                slug={game.slug}
                                                issidebar={true}
                                                isRecentPlay={true}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Game yêu thích */}
                            <div>
                                <h2 className="text-2xl mt-10 font-bold text-[#002B50] mb-4">Game yêu thích
                                </h2>
                                {favouriteGames.length === 0 ? (
                                    <p className="text-sm text-[#002B50]">
                                        Bạn chưa có game yêu thích nào.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-6 gap-2">
                                        {favouriteGames.map((game) => (
                                            <GameCard
                                                key={game._id}
                                                image={game.thumbnail}
                                                video={game.video}
                                                title={game.name}
                                                slug={game.slug}
                                                issidebar={true}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>

    )
}
