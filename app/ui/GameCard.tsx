"use client"
import { useState } from "react"
export default function GameCard({ 
    image, 
    video, 
    title, 
    href 
  }: {
    image: string
    video: string
    title: string
    href: string
  }) {
    const [isHovered,setIsHovered] = useState(false);
  return (
    <a 
        className=" relative rounded-[12px] overflow-hidden bg-white w-[94px] h-[94px] shadow-md m-1.25"
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        {isHovered?(
            <div>
                <video
                src={video}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>

            <span className="absolute bottom-0 left-0 right-0  text-white text-[8px] font-bold text-center z-10">
                {title}
            </span>
            </div>
            
            
        ):(
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
            />
            
        )}
        
    </a>
  );
}
