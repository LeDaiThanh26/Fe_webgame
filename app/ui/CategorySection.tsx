import Image from "next/image";
import GameCardV2 from "./GameCardV2"; 
interface GameData {
    image: string;
    video: string;
    title: string;
    href: string;
    currentPlaying: number;
}
interface CategorySectionProps {
    bannerSrc: string; 
    altText: string;
    games: GameData[];
    isGameHayNhat?: boolean 
}

export default function CategorySection({
    bannerSrc,
    altText,
    games,
    isGameHayNhat,
}: CategorySectionProps) {

    const gamesPerRow = 6;
    const rows = [];
    for (let i = 0; i < games.length; i += gamesPerRow) {
        rows.push(games.slice(i, i + gamesPerRow));
    }

    return (
        <div className="flex flex-col  ">
            <div className="flex z-10 w-fit ">
                <Image
                    src={bannerSrc}
                    alt={altText}
                    width={250}
                    height={100}
                    className={isGameHayNhat?"z-9 cursor-pointer":"-mb-[14px] z-9 cursor-pointer"}
                />
                {!isGameHayNhat && (
                    <>
                        <div className="w-[200px] cursor-pointer z-8 -ml-[10px] h-full rounded-tr-xl font-bold bg-gray-300 shadow-inner shadow-black/30 flex items-center justify-center">
                        Game hay
                        </div>

                        <div className="w-[170px] cursor-pointer -ml-[20px] h-full rounded-tr-xl font-bold bg-gray-200 shadow-inner shadow-black/30 flex items-center justify-center">
                        Chơi nhiều
                        </div>
                    </>
                )}
                
            </div>       
            <div className="flex flex-col bg-white gap-5 p-5 px-2.5 rounded-b-[5px] rounded-r-[5px] shadow-[0_6px_16.3px_rgba(0,0,0,0.5)]">
                {rows.map((row, rowIndex) => (
                    <div className="flex" key={rowIndex}>
                        {row.map((game, gameIndex) => (
                            <GameCardV2 
                                key={gameIndex}
                                {...game}
                            />
                        ))}
                    </div>
                ))}
                
                {/* Nút Xem tất cả */}
                <div className="self-end mr-3 cursor-pointer font-bold text-[12px]">
                    {'>> Xem tất cả'}
                </div>
            </div>
        </div>
    );
}