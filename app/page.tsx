import { Suspense } from "react";
import Image from "next/image";

import { fetchAllCategories, fetchGamesByCategory, fetchRandomGames } from "@/services/game.service";

import GameCategoriesSection from "@/components/features/home/categories_section/GameCategoriesSection";
import CategorySection from "@/components/features/home/category_section/CategorySection";
import LeaderBoard from "@/components/features/home/leaderboard/LeaderBoard";

import GameCategoriesSectionSkeleton from "@/components/ui/skeleton/GameCategoriesSectionSkeleton";
import CategorySectionSkeleton from "@/components/ui/skeleton/CategorySectionSkeleton";


async function Categories() {
  const categories = await fetchAllCategories();
  return <GameCategoriesSection title="Online Games at GameZone" categories={categories} />;
}

async function GamesHayNhat() {
  const games = await fetchRandomGames();
  return <CategorySection bannerSrc="/banner_gamehaynhat.png" altText="Game Hay Nhất" games={games} isGameHayNhat />;
}

async function GamesBanSung() {
  const games = await fetchGamesByCategory("shooter");
  return <CategorySection bannerSrc="/banner_gamebansung.png" altText="Game bắn súng" games={games} />;
}

async function GamesDuaXe() {
  const games = await fetchGamesByCategory("racing");
  return <CategorySection bannerSrc="/banner_gameduaxe.png" altText="Game đua xe" games={games} />;
}


export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-[1230px]">

      <Suspense fallback={<GameCategoriesSectionSkeleton rowCount={6} />}>
        <Categories />
      </Suspense>

      <div className="flex w-full gap-7">

        <div className="flex flex-col w-[72%] gap-7">
          <Suspense fallback={<CategorySectionSkeleton />}>
            <GamesHayNhat />
          </Suspense>

          <Suspense fallback={<CategorySectionSkeleton />}>
            <GamesBanSung />
          </Suspense>

          <Suspense fallback={<CategorySectionSkeleton />}>
            <GamesDuaXe />
          </Suspense>
        </div>

        <div className="flex flex-col w-[28%] gap-6">
          <LeaderBoard />

          <div className="bg-white shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
            <Image src="/banner_quangcao3.png" alt="Quảng cáo" width={999} height={999} className="rounded-[5px]" />
          </div>
          <div className="bg-white shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
            <Image src="/banner_quangcao4.jpg" alt="Quảng cáo" width={999} height={999} className="rounded-[5px]" />
          </div>
        </div>

      </div>
    </div>
  );
}