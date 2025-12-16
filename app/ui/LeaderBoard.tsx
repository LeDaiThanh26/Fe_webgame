import { Player } from "./types";
import PlayerCard from "./PlayerCard";

type LeaderBoardProps = {
    players: Player[];
    onViewAll?: () => void;
  };
  
  export default function LeaderBoard({ players, onViewAll }: LeaderBoardProps) {
    const sortedPlayers = [...players]
    .sort((a, b) => b.experiencePoints - a.experiencePoints);
    return (
      <div className="bg-white flex flex-col gap-3 h-[660px] shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
        <div className="bg-red-500 w-full font-bold text-2xl h-13 rounded-t-[5px] text-white flex items-center justify-center">
          Top game thủ
        </div>
        
        {sortedPlayers.map((player,index) => (
          <PlayerCard key={index} player={player} rank={index+1}/>
        ))}
        
        {onViewAll && (
          <div 
            className="self-end mr-3 cursor-pointer font-bold text-[12px]"
            onClick={onViewAll}
          >
            {'>> Xem tất cả'}
          </div>
        )}
      </div>
    );
  }