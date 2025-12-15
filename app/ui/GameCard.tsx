"use client";

import { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  image: string;
  video: string;
  title: string;
  href: string;
  issidebar?: boolean;
};

const GameCard = forwardRef<HTMLDivElement, Props>(
  ({ image, video, title, href, issidebar = false }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    return (
      <div
        ref={ref} 
        className={`relative rounded-[12px] cursor-pointer overflow-hidden bg-white
          ${issidebar ? "w-[94px] h-[94px]" : "w-[124px] h-[124px] mx-2.5"}
          shadow-md transition-transform hover:scale-105`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push(href)}
      >
        {isHovered ? (
          <>
            <video
              src={video}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-0 left-0 right-0 text-white text-[8px] font-bold text-center z-10">
              {title}
            </span>
          </>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  }
);

GameCard.displayName = "GameCard";

export default GameCard;
