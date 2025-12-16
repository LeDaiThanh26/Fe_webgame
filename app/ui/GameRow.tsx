import { FaChevronRight } from "react-icons/fa";
import { Category } from "./types";
import CategoryCard from "./CategoryCard";
import GameCard from "./GameCard";
type GameRowProps = {
  category: Category;
  onNavigate?: () => void;
};

export default function GameRow({ category, onNavigate }: GameRowProps) {
  return (
    <div className="flex items-center">
      <CategoryCard
        image={category.image}
        title={category.title}
        color={category.color}
      />

      {category.games.map((game) => (
        <GameCard
          key={game.id}
          gameId={game.id}
          image={game.image}
          video={game.video}
          title={game.title}
          slug={game.href}
        />
      ))}

      <div
        className="flex items-center justify-center cursor-pointer hover:bg-gray-100 h-full w-[33px] rounded-r-2xl"
        onClick={onNavigate}
      >
        <FaChevronRight size={20} className="text-gray-500" />
      </div>
    </div>
  );
}