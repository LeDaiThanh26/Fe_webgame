"use client";

import { useState, useEffect } from "react";
import { fetchAllCategories, fetchGamesByCategory, fetchRandomGames } from "@/app/lib/api/games";
import { fetchAllUsers } from "@/app/lib/api/users";
import { generateAvatar } from "@/app/lib/utils/avatar";
import type { Category, Player } from "@/app/lib/types";

export function useHomeData() {
  const [games, setGames] = useState<any[]>([]);
  const [shootingGames, setShootingGames] = useState<any[]>([]);
  const [drivingGames, setDrivingGames] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [cats, randomGames, shooting, driving, users] = await Promise.all([
          fetchAllCategories(),
          fetchRandomGames(),
          fetchGamesByCategory("shooter"),
          fetchGamesByCategory("racing"),
          fetchAllUsers(),
        ]);

        if (cancelled) return;

        setCategories(cats);
        setGames(randomGames);
        setShootingGames(shooting);
        setDrivingGames(driving);

        // Gắn avatar cho từng user
        const withAvatars = await Promise.all(
          users.map(async (u) => ({
            ...u,
            avatar: await generateAvatar(),
          }))
        );
        if (!cancelled) setPlayers(withAvatars);
      } catch (err) {
        console.error("Lỗi tải dữ liệu trang chủ:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { games, shootingGames, drivingGames, categories, players, loading };
}
