import { Player } from "./types";

export type PlayerCardProps = {
    player: Player;
  };
export default function PlayerCard({ player }: PlayerCardProps) {
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
        <span className="text-3xl">{getRankEmoji(player.rank)}</span>
        
        <div>
          <div className="text-red-500 font-bold text-[16px]">{player.name}</div>
          <div className="font-bold text-[11px]">
            Điểm kinh nghiện: {player.experiencePoints.toLocaleString()}
          </div>
          <div className="font-bold text-[11px]">
            Tổng thời gian chơi: {player.playTime}
          </div>
        </div>
        
        <img
          src={player.avatar}
          alt={player.name}
          width={60}
          height={60}
          className="object-cover"
        />
      </div>
    );
  }