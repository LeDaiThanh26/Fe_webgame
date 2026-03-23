import API_BASE from "./client";
import type { GameDetail, FavouriteGame } from "../types";

export async function fetchRandomGames(): Promise<FavouriteGame[]> {
  const res = await fetch(`${API_BASE}/games/random-12`, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return ((json.data || []) as any[])
    .filter((g) => g.thumbnail && g.slug)
    .map((g) => ({
      _id: g._id,
      name: g.name,
      thumbnail: g.thumbnail,
      video: g.video,
      slug: g.slug,
    }));
}

export async function fetchGamesByCategory(category: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/games/category/${category}`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export async function fetchAllCategories(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/games/allcategory`);
  if (!res.ok) return [];
  const json = await res.json();
  if (json.data && Array.isArray(json.data)) return json.data;
  if (Array.isArray(json)) return json;
  return [];
}

export async function fetchGameBySlug(slug: string): Promise<GameDetail | null> {
  const res = await fetch(`${API_BASE}/games/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function fetchAllGames(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/games/`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}
