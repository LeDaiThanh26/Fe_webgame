"use client";

import { useState, useEffect } from "react";
import { fetchRandomGames, fetchAllGames } from "@/services/game.service";
import { fetchCurrentUser, fetchFavouriteGames, fetchRecentGames } from "@/services/auth.service";
import type { User, FavouriteGame } from "@/types";

const FALLBACK_AVATAR = "https://placehold.co/60/0095BE/fff?text=U";

export function useSidebarData() {
  const [user, setUser] = useState<User | undefined>();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [favouriteGames, setFavouriteGames] = useState<FavouriteGame[]>([]);
  const [recentGames, setRecentGames] = useState<FavouriteGame[]>([]);
  const [recommendedGames, setRecommendedGames] = useState<FavouriteGame[]>([]);
  const [totalGame, setTotalGame] = useState(0);

  useEffect(() => {
    fetchRandomGames().then(setRecommendedGames);
  }, []);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    let cancelled = false;

    const load = async () => {
      const userData = await fetchCurrentUser(token);
      if (!userData || cancelled) return;

      setUser(userData);
      // Lấy avatar từ DB — đã được lưu lúc đăng ký
      setAvatarUrl(userData.avatar || FALLBACK_AVATAR);

      const userId = userData._id!;
      const [favs, recents] = await Promise.all([
        fetchFavouriteGames(userId),
        fetchRecentGames(userId),
      ]);
      if (cancelled) return;
      setFavouriteGames(favs);
      setRecentGames(recents);
      setTotalGame(recents.length);
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const searchGames = async (query: string): Promise<FavouriteGame[]> => {
    if (!query.trim()) return [];
    const all = await fetchAllGames();
    const q = query.toLowerCase();
    return (all as any[])
      .filter((g: any) => g.name?.toLowerCase().includes(q))
      .map((g: any) => ({ _id: g._id, name: g.name, thumbnail: g.thumbnail, video: g.video, slug: g.slug }));
  };

  return { user, avatarUrl, favouriteGames, recentGames, recommendedGames, totalGame, searchGames };
}
