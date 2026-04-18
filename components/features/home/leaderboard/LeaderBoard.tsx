"use client";

import { useLeaderboard } from "@/hooks/use-leaderboard";
import PlayerCard from "./PlayerCard";
import LeaderBoardSkeleton from "@/components/ui/skeleton/LeaderBoardSkeleton";

export default function LeaderBoard() {
  const { players, loading } = useLeaderboard();

  const sorted = players
    .slice()
    .sort((a, b) => b.experiencePoints - a.experiencePoints)
    .slice(0, 7);

  return (
    <>
      {loading ? <LeaderBoardSkeleton /> : (
        <div className="bg-white flex flex-col gap-3 min-h-[660px] shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px] overflow-hidden">
          <div className="bg-red-500 w-full px-4 pt-3 pb-2 rounded-t-[5px] flex flex-col items-center gap-1">
            <span className="font-bold text-2xl text-white">Top game thủ</span>
          </div>
          {sorted.map((player, index) => (
            <PlayerCard key={`${player.name}-${index}`} player={player} rank={index + 1} />
          ))}
        </div>
      )}
    </>
  );
}