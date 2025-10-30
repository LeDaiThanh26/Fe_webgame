"use client"
import Image from "next/image"
import {FaGrinSquint, FaSearch} from "react-icons/fa"

export default function PokiCard() {
  return (
    <div className="flex flex-col items-center justify-between rounded-[12px] overflow-hidden bg-white w-20 h-20 shadow-md m-1.25">
      <Image
        src="/poki-logo.png"
        alt="pokiIcon"
        width={40}
        height={30}
        className="h-3/5 w-auto object-contain"
      />

      {/* Line chia ngang */}
      <div className="w-full h-px bg-gray-200 "></div>

      {/* 2 icon có line dọc chia giữa */}
      <div className="h-2/5 w-auto object-contain flex items-center justify-center w-full">
        <div className="flex items-center justify-center w-1/2 hover:bg-gray-200 h-full cursor-pointer">
          <FaGrinSquint className="text-blue-500 w-4 h-4" />
        </div>

        {/* Line chia dọc */}
        <div className="h-full w-px bg-gray-200"></div>

        <div className="flex items-center justify-center w-1/2 hover:bg-gray-200 h-full cursor-pointer">
          <FaSearch className="text-blue-500 w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
