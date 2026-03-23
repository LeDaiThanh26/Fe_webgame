"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import API_BASE from "@/app/lib/api/client";

interface GameThumb {
  _id: string;
  name: string;
  thumbnail: string;
  slug: string;
}

const SimilarGames = () => {
  const [games, setGames] = useState<GameThumb[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/games/random`, { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setGames(json.data);
      })
      .catch((err) => console.error("Lỗi fetch game random:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="card right-column">
        <div className="section-title" style={{ marginTop: 0 }}>
          Đề xuất cho bạn
        </div>
        <div className="similar-game-list">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="game-thumb" style={{ background: "#eee" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card right-column">
      <div className="section-title" style={{ marginTop: 0 }}>
        Đề xuất cho bạn
      </div>
      <div className="similar-game-list">
        {games.map((game) => (
          <Link
            href={game.slug}
            key={game._id}
            className="game-thumb"
            style={{ display: "block", position: "relative" }}
          >
            <img
              src={game.thumbnail}
              alt={game.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                fontSize: "11px",
                padding: "4px",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {game.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarGames;