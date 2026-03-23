"use client";

import GameCategoriesSection from "@/app/ui/GameCategoriesSection";
import CategorySection from "@/app/ui/CategorySection";
import LeaderBoard from "@/app/ui/LeaderBoard";
import Image from "next/image";
import { useHomeData } from "@/app/hooks/useHomeData";

export default function Home() {
  const { games, shootingGames, drivingGames, categories, players, loading } = useHomeData();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-[1230px]">
      <GameCategoriesSection
        title="Online Games at GameZone"
        categories={categories}
      />

      <div className="flex w-full gap-7">
        {/* Left: Game sections */}
        <div className="flex flex-col w-[72%] gap-7">
          <CategorySection
            bannerSrc="/banner_gamehaynhat.png"
            altText="Game Hay Nhất"
            games={games}
            isGameHayNhat={true}
          />
          <CategorySection
            bannerSrc="/banner_gamebansung.png"
            altText="Game bắn súng"
            games={shootingGames}
          />
          <CategorySection
            bannerSrc="/banner_gameduaxe.png"
            altText="Game đua xe"
            games={drivingGames}
          />
        </div>

        {/* Right: Leaderboard + Ads */}
        <div className="flex flex-col w-[28%] gap-6">
          <LeaderBoard players={players} />
          <div className="bg-white shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
            <Image
              src="/banner_quangcao3.png"
              alt="Quảng cáo game"
              width={999}
              height={999}
              className="rounded-[5px]"
            />
          </div>
          <div className="bg-white shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
            <Image
              src="/banner_quangcao4.jpg"
              alt="Quảng cáo game"
              width={999}
              height={999}
              className="rounded-[5px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}