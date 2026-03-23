"use client";

import { Gamepad2, Clock } from "lucide-react";
import formatPlayTime from "@/app/lib/utils/formatPlayTime";
import type { User } from "@/app/lib/types";

type SidebarProfileProps = {
  user: User | undefined;
  avatarUrl: string;
  totalGame: number;
};

export default function SidebarProfile({ user, avatarUrl, totalGame }: SidebarProfileProps) {
  return (
    <div className="text-[#002b50] mr-6 flex flex-col bg-white rounded-2xl shadow-[0px_7px_10px_4px_#5d6b844d]">
      {/* Thông tin user */}
      <div className="flex p-5 gap-5 flex-col border-b border-gray-300">
        <div className="flex gap-5 items-center">
          <img src={avatarUrl} className="h-[60px] w-[60px]" alt="avatar" />
          <div className="flex flex-col">
            <h1 className="text-[24px] font-bold">{user?.name}</h1>
            <h2 className="text-[13px] font-[400] pb-2">{user?.email}</h2>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between w-full">
        <div className="flex gap-2 p-5 w-[50%] items-center border-r border-gray-300">
          <Gamepad2 size={24} className="mb-1 mr-1" strokeWidth={3} />
          <h1 className="text-[20px] font-bold">{totalGame}</h1>
          <h3 className="text-[13px] font-[600] mt-1">Game đã chơi</h3>
        </div>
        <div className="flex gap-2 p-5 w-[50%] items-center">
          <Clock size={24} className="mb-1" strokeWidth={3} />
          <h1 className="text-[20px] font-bold">
            {formatPlayTime(Number(user?.playTime))}
          </h1>
          <h3 className="text-[13px] font-[600] mt-1">Tổng thời gian chơi</h3>
        </div>
      </div>
    </div>
  );
}
