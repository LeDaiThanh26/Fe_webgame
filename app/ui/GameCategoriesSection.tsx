import { Category } from "./types";
import GameRow from "./GameRow";

type GameCategoriesSectionProps = {
    title?: string;
    categories: Category[];
  };
  
  export default function GameCategoriesSection({ 
    title = "Online Games at GameZone",
    categories,
  }: GameCategoriesSectionProps) {
    return (
      <div className="flex bg-white flex-col w-full  mt-5 rounded-[5px] py-5 pl-5 shadow-[0_6px_16.3px_rgba(0,0,0,0.5)]">
        <h1 className="text-3xl font-bold my-3">{title}</h1>
        
        <div className="flex flex-col gap-5">
          {categories.map((category) => (
            <GameRow 
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    );
  }
  