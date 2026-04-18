"use client";

import { useEffect, useRef } from "react";
import API_BASE from "@/services/api";

export default function GamePlayTracker() {
  const startTimeRef = useRef<number>(Date.now());
  const hasSentRef = useRef(false);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
    hasSentRef.current = false;

    // Prefetch userId lúc mount trước
    const prefetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const user = await res.json();
          userIdRef.current = user._id;
        }
      } catch (err) {
        console.error("prefetch error:", err);
      }
    };

    prefetchUser();

    const endSession = () => {
      if (hasSentRef.current) return;
      hasSentRef.current = true;

      const gameId = localStorage.getItem("currentGameId");
      const userId = userIdRef.current;
      if (!userId || !gameId) return;

      const playSeconds = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      );
      if (playSeconds < 3) return;

      // keepalive: true = browser tự đảm bảo gửi dù page đóng
      fetch(`${API_BASE}/recents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, gameId }),
        keepalive: true, // ← chìa khóa
      }).catch(() => { });

      fetch(`${API_BASE}/users/addpoint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, playSeconds }),
        keepalive: true, // ← chìa khóa
      }).catch(() => { });
    };

    window.addEventListener("beforeunload", endSession);
    window.addEventListener("pagehide", endSession);
    return () => {
      endSession();
      window.removeEventListener("beforeunload", endSession);
      window.removeEventListener("pagehide", endSession);
    };
  }, []);

  return null;
}