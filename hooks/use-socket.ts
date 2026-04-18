"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket, ManagerOptions, SocketOptions } from "socket.io-client";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

export type SocketStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "error"
  | "disconnected";


export function useSocket(
  namespace: string,
  options?: Partial<ManagerOptions & SocketOptions>
) {
  const [status, setStatus] = useState<SocketStatus>("connecting");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(`${SERVER_URL}${namespace}`, {
      reconnection: true,
      reconnectionDelay: 3000,
      reconnectionAttempts: Infinity,
      transports: ["websocket"],
      ...options,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setStatus("connected");
      console.log(`[Socket.IO ${namespace}] Connected:`, socket.id);
    });

    socket.on("disconnect", (reason) => {
      setStatus("reconnecting");
      console.log(`[Socket.IO ${namespace}] Disconnected:`, reason);
    });

    socket.on("connect_error", (err) => {
      setStatus("error");
      console.error(`[Socket.IO ${namespace}] Connection error:`, err.message);
    });

    socket.on("reconnect", (attempt) => {
      setStatus("connected");
      console.log(
        `[Socket.IO ${namespace}] Reconnected after ${attempt} attempt(s)`
      );
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [namespace]);

  return { socket: socketRef.current, status };
}
