import API_BASE from "./client";
import type { User, FavouriteGame } from "../types";

export async function fetchCurrentUser(token: string): Promise<User | null> {
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchAllUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchFavouriteGames(userId: string): Promise<FavouriteGame[]> {
  const res = await fetch(`${API_BASE}/favourites/user/${userId}`);
  if (!res.ok) return [];
  const json = await res.json();
  return ((json.data || []) as any[])
    .map((f: any) => f.id_game)
    .filter((g: any) => !!g && g.thumbnail && g.slug)
    .map((g: any) => ({
      _id: g._id,
      name: g.name,
      thumbnail: g.thumbnail,
      video: g.video,
      slug: g.slug,
    }));
}

export async function fetchRecentGames(userId: string): Promise<FavouriteGame[]> {
  const res = await fetch(`${API_BASE}/recents/${userId}`);
  if (!res.ok) return [];
  const json = await res.json();
  const rawList = Array.isArray(json) ? json : json.data || [];
  return rawList
    .map((r: any) => r.id_game || r.game || r)
    .filter((g: any) => !!g && g.thumbnail && g.slug)
    .map((g: any) => ({
      _id: g._id,
      name: g.name,
      thumbnail: g.thumbnail,
      video: g.video,
      slug: g.slug,
    }))
    .slice(0, 12);
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res;
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res;
}
