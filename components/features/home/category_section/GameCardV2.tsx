"use client"
import { useRef } from "react"
import GameCard from "@/components/features/home/categories_section/GameCard"
export default function GameCardV2({
  name,
  title,
  currentPlaying,
  thumbnail,
  video,
  slug,
  _id,
}: {
  name?: string
  title?: string
  currentPlaying?: number
  thumbnail?: string
  video?: string
  slug: string
  _id?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const displayName = name ?? title ?? "";
  return (
    <div className="flex flex-col gap-2">
      <GameCard
        ref={cardRef}
        title={displayName}
        image={thumbnail ?? ""}
        video={video ?? ""}
        slug={slug}
        gameId={_id}
      />

      <div className="flex flex-col mx-2.5">
        <p className="text-[#2E7DCD] font-bold cursor-pointer text-[15px]"
          onClick={() => cardRef.current?.click()}>
          {displayName}
        </p>
        <p className="text-black text-[10px]">
          Đang chơi: {currentPlaying ?? 0}
        </p>
      </div>
    </div>
  );
}
