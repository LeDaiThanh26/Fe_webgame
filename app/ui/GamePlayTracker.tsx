"use client";

import { useEffect, useRef } from "react";

export default function GamePlayTracker() {
  const startTimeRef = useRef<number>(Date.now());
  const lastSentRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();

    // Gửi mỗi 30 giây 1 lần
    const interval = setInterval(async () => {
      const token = localStorage.getItem("token");
      const gameId = localStorage.getItem("currentGameId");
      if (!token || !gameId) return;

      const playSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const newSeconds = playSeconds - lastSentRef.current;

      if (newSeconds < 30) return; // Chỉ gửi khi đủ 30s mới

      try {
        const userRes = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) return;
        const user = await userRes.json();

        // Gửi số giây mới tích lũy
        await fetch("http://localhost:5000/api/users/addpoint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            playSeconds: newSeconds,
          }),
        });

        lastSentRef.current = playSeconds;
        console.log("✅ Gửi:", newSeconds, "giây");
      } catch (err) {
        console.error(err);
      }
    }, 30000); // Mỗi 30 giây

    return () => clearInterval(interval);
  }, []);

  return null;
}