import { io, Socket } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "";

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(BACKEND_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
    console.log("Socket initialized");
  }
  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error(
      "Socket has not been initialized. Call initializeSocket first."
    );
  }
  return socket;
};
