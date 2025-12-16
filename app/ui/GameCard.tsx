"use client";

import { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { FaRedo } from 'react-icons/fa';        // Từ Font Awesome


type Props = {
  image: string;
  video: string;
  title: string;
  slug: string;
  issidebar?: boolean;
  isRecentPlay?: boolean;
};

const GameCard = forwardRef<HTMLDivElement, Props>(
  ({ image, video, title, slug, issidebar = false,isRecentPlay=false}, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    return (
      <>
      <div className="relative transition-transform hover:scale-105">
      <div
        ref={ref} 
        className={`relative rounded-[12px] cursor-pointer overflow-hidden bg-white
          ${issidebar ? "w-[94px] h-[94px]" : "w-[124px] h-[124px] mx-2.5"}
          shadow-md `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push(slug)}
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
      {isRecentPlay?(
      <div className="absolute top-2 -left-1 z-5 flex justify-center items-center  bg-white h-7 w-7 rounded-r-3xl">
        <FaRedo size={15} color="#10a2ff" className="rotate-45 scale-x-[-1]"/>
      </div>)
      :("")}
      
      </div>
      
      </>
    );
  }
);

GameCard.displayName = "GameCard";

export default GameCard;
