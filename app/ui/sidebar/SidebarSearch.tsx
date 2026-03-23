"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import GameCard from "@/app/ui/GameCard";
import type { FavouriteGame } from "@/app/lib/types";

type SidebarSearchProps = {
  searchGames: (q: string) => Promise<FavouriteGame[]>;
  recommendedGames: FavouriteGame[];
  recentGames: FavouriteGame[];
  favouriteGames: FavouriteGame[];
};

export default function SidebarSearch({
  searchGames,
  recommendedGames,
  recentGames,
  favouriteGames,
}: SidebarSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FavouriteGame[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    let active = true;
    const timeout = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchGames(searchQuery);
      if (active) setSearchResults(results);
      if (active) setIsSearching(false);
    }, 400);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [searchQuery, searchGames]);

  return (
    <>
      {/* Search input */}
      <div className="mb-8">
        <div className="relative bg-white rounded-full shadow-lg mr-6">
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-[#002B50] rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full" />
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

      {/* Search results or default lists */}
      {searchQuery.trim() ? (
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold text-[#002B50] mb-4">Kết quả tìm kiếm</h2>
          {isSearching && <p className="text-sm text-[#002B50] mb-2">Đang tìm kiếm...</p>}
          {!isSearching && searchResults.length === 0 && (
            <p className="text-sm text-[#002B50] mb-2">Không tìm thấy game nào phù hợp.</p>
          )}
          <div className="grid grid-cols-6 gap-4">
            {searchResults.map((game) => (
              <GameCard
                key={game._id}
                gameId={game._id}
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
          {/* Game đề xuất */}
          <div>
            <h2 className="text-2xl font-bold text-[#002B50] mb-4">Game đề xuất</h2>
            {recommendedGames.length === 0 ? (
              <p className="text-sm text-[#002B50]">Đang tải danh sách game đề xuất...</p>
            ) : (
              <div className="grid grid-cols-6 gap-2">
                {recommendedGames.map((game) => (
                  <GameCard
                    key={game._id}
                    gameId={game._id}
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

          {/* Game vừa chơi */}
          <div>
            <h2 className="text-2xl mt-10 font-bold text-[#002B50] mb-4">Game vừa chơi</h2>
            {recentGames.length === 0 ? (
              <p className="text-sm text-[#002B50] col-span-6">Chưa có game chơi gần đây.</p>
            ) : (
              <div className="grid grid-cols-6 gap-5">
                {recentGames.map((game) => (
                  <GameCard
                    key={game._id}
                    gameId={game._id}
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
            <h2 className="text-2xl mt-10 font-bold text-[#002B50] mb-4">Game yêu thích</h2>
            {favouriteGames.length === 0 ? (
              <p className="text-sm text-[#002B50]">Bạn chưa có game yêu thích nào.</p>
            ) : (
              <div className="grid grid-cols-6 gap-2">
                {favouriteGames.map((game) => (
                  <GameCard
                    key={game._id}
                    gameId={game._id}
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
    </>
  );
}
