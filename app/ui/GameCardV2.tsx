"use client"
import { useRef } from "react"
import GameCard from "./GameCard"
export default function GameCardV2({ 
  name, 
  currentPlaying,
  thumbnail, 
  video, 
  slug,
}: {
  name: string
  currentPlaying: number
  thumbnail: string
  video: string
  slug: string
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col gap-2">
      <GameCard 
        ref={cardRef}
        title={name} 
        image={thumbnail} 
        video={video} 
        slug={slug}
      />

      <div className="flex flex-col mx-2.5">
        <p className="text-[#2E7DCD] font-bold cursor-pointer text-[15px]"
          onClick={() => cardRef.current?.click()}>
          {name}
        </p>
        <p className="text-black text-[10px]">
          Đang chơi: {currentPlaying?currentPlaying:0}
        </p>
      </div>
    </div>
  );
}
