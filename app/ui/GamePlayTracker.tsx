"use client";

import { useEffect, useRef } from "react";

export default function GamePlayTracker() {
  const startTimeRef = useRef<number>(Date.now());
  const hasSentRef = useRef(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    hasSentRef.current = false;

    const endSession = async () => {
      // Chỉ gửi 1 lần
      if (hasSentRef.current) return;
      hasSentRef.current = true;

      const token = localStorage.getItem("token");
      const gameId = localStorage.getItem("currentGameId");
      if (!token || !gameId) return;

      const playSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      // Bỏ qua nếu dưới 3 giây (click nhầm)
      if (playSeconds < 3) return;

      try {
        const userRes = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) return;
        const user = await userRes.json();

        // Dùng sendBeacon để đảm bảo gửi được khi reload/back
        navigator.sendBeacon(
          "http://localhost:5000/api/recents",
          new Blob([JSON.stringify({ userId: user._id, gameId })], {
            type: "application/json",
          })
        );

        navigator.sendBeacon(
          "http://localhost:5000/api/users/addpoint",
          new Blob([JSON.stringify({ userId: user._id, playSeconds })], {
            type: "application/json",
          })
        );

        console.log("✅ Đã gửi:", playSeconds, "giây");
      } catch (err) {
        console.error(err);
      }
    };

    // Khi reload/back/đóng tab
    window.addEventListener("beforeunload", endSession);
    window.addEventListener("pagehide", endSession);

    // Khi component unmount (rời trang game)
    return () => {
      endSession();
      window.removeEventListener("beforeunload", endSession);
      window.removeEventListener("pagehide", endSession);
    };
  }, []); // Chỉ chạy 1 lần khi mount

  return null;
}