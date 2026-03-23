"use client";

import { useEffect, useRef } from "react";
import API_BASE from "@/app/lib/api/client";

export default function GamePlayTracker() {
  const startTimeRef = useRef<number>(Date.now());
  const hasSentRef = useRef(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    hasSentRef.current = false;

    const endSession = async () => {
      if (hasSentRef.current) return;
      hasSentRef.current = true;

      const token = localStorage.getItem("token");
      const gameId = localStorage.getItem("currentGameId");
      if (!token || !gameId) return;

      const playSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (playSeconds < 3) return;

      try {
        const userRes = await fetch(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) return;
        const user = await userRes.json();

        navigator.sendBeacon(
          `${API_BASE}/recents`,
          new Blob([JSON.stringify({ userId: user._id, gameId })], {
            type: "application/json",
          })
        );

        navigator.sendBeacon(
          `${API_BASE}/users/addpoint`,
          new Blob([JSON.stringify({ userId: user._id, playSeconds })], {
            type: "application/json",
          })
        );
      } catch (err) {
        console.error("GamePlayTracker error:", err);
      }
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