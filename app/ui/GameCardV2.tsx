"use client"
import { useRef } from "react"
import GameCard from "./GameCard"
export default function GameCardV2({ 
  title, 
  currentPlaying,
  image, 
  video, 
  href,
}: {
  title: string
  currentPlaying: number
  image: string
  video: string
  href: string
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col gap-2">
      <GameCard 
        ref={cardRef}
        title={title} 
        image={image} 
        video={video} 
        href={href}
      />

      <div className="flex flex-col mx-2.5">
        <p className="text-[#2E7DCD] font-bold cursor-pointer text-[15px]"
          onClick={() => cardRef.current?.click()}>
          {title}
        </p>
        <p className="text-black text-[10px]">
          Đang chơi: {currentPlaying}
        </p>
      </div>
    </div>
  );
}
