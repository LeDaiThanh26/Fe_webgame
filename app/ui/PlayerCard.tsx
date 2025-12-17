import { Player } from "./types";

export type PlayerCardProps = {
    player: Player;
    rank: number
  };
export default function PlayerCard({ player,rank}: PlayerCardProps) {
    const getRankEmoji = (rank: number): string => {
      switch (rank) {
        case 1: return "🥇";
        case 2: return "🥈";
        case 3: return "🥉";
        default: return "🏅";
      }
    };
  
    return (
      <div className="flex gap-2 items-center justify-center mx-3 border-b-1 border-orange-400 pb-2">
        <span className="text-3xl">{getRankEmoji(rank)}</span>
        
        <div className="w-[165px]">
          <div className="text-red-500 font-bold text-[16px]">{player.name}</div>
          <div className="font-bold text-[11px]">
            Điểm kinh nghiệm: {player.experiencePoints.toLocaleString()}
          </div>
          <div className="font-bold text-[11px]">
            Tổng thời gian chơi: {(() => {
              const totalSeconds = Number(player.playTime) || 0;
              const hours = Math.floor(totalSeconds / 3600);
              const minutes = Math.floor((totalSeconds % 3600) / 60);
              const seconds = totalSeconds % 60;
              
              if (hours > 0) {
                return `${hours}h ${minutes}m ${seconds}s`;
              } else if (minutes > 0) {
                return `${minutes}m ${seconds}s`;
              } else {
                return `${seconds}s`;
              }
            })()}
          </div>
        </div>
        
        <img
          src={player.avatar}
          alt={player.name}
          className="w-[60px] h-[60px] object-cover "
        />
      </div>
    );
  }