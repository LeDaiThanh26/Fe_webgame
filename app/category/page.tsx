"use client";

import { useState, useEffect } from "react";
import CategorySection from "@/app/ui/CategorySection";
import LeaderBoard from "@/app/ui/LeaderBoard";
import { fetchAllUsers } from "@/app/lib/api/users";
import { fetchGamesByCategory } from "@/app/lib/api/games";
import { generateAvatar } from "@/app/lib/utils/avatar";
import type { Player } from "@/app/lib/types";

export default function CategoryLayout() {
  const [games, setGames] = useState<any[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [gamesData, users] = await Promise.all([
          fetchGamesByCategory("action"),
          fetchAllUsers(),
        ]);
        if (cancelled) return;
        setGames(gamesData);
        const withAvatars = await Promise.all(
          users.map(async (u) => ({ ...u, avatar: await generateAvatar() }))
        );
        if (!cancelled) setPlayers(withAvatars);
      } catch (err) {
        console.error("Lỗi tải trang category:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-[1230px]">
      <div className="flex w-full gap-7">
        {/* Left */}
        <div className="flex flex-col w-[72%] gap-7">
          <CategorySection
            bannerSrc="/banner_gamehaynhat.png"
            altText="Game Hay Nhất"
            games={games}
            isGameHayNhat={true}
          />
        </div>
        {/* Right */}
        <div className="flex flex-col w-[28%] gap-5">
          <LeaderBoard players={players} />
        </div>
      </div>
    </div>
  );
}
