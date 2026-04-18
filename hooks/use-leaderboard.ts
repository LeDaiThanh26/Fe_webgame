"use client";

import { useEffect, useState } from "react";
import { useSocket } from "./use-socket";
import type { Player } from "@/types";

const FALLBACK_AVATAR = "https://placehold.co/60/0095BE/fff?text=U";

/**
 * Hook lấy dữ liệu leaderboard realtime qua Socket.IO namespace /leaderboard.
 * Build on top của useSocket — thêm feature khác chỉ cần tạo file tương tự.
 */
export function useLeaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  // Dùng hook chung, chỉ đổi namespace
  const { socket } = useSocket("/leaderboard");


  useEffect(() => {
    if (!socket) return;

    const handleLeaderboard = (data: Record<string, unknown>[]) => {
      if (!Array.isArray(data)) return;

      const mapped: Player[] = data.map((u) => ({
        name: u.name as string,
        experiencePoints: u.experiencePoints as number,
        playTime: u.playTime as number,
        avatar: (u.avatar as string) || FALLBACK_AVATAR,
      }));

      setPlayers(mapped);
      setLoading(false);
    };

    socket.on("leaderboard", handleLeaderboard);

    return () => {
      socket.off("leaderboard", handleLeaderboard);
    };
  }, [socket]);

  return { players, loading };
}
