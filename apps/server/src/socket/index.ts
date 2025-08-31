import { gameSocket } from "@/socket/gameSocket";
import { Server } from "http";
import { Server as Socket } from "socket.io";

let io: Socket;

export function initSocket(server: Server) {
  io = new Socket(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "",
    },
  });

  console.log("✅ Socket.IO initialized");

  io.on("connection", (socket) => {
    // console.log(`🟢 New client connected: ${socket.id}`);

    gameSocket(io, socket);

    // socket.on("disconnect", () => {
    //   console.log(`🔴 Client disconnected: ${socket.id}`);
    // });
  });
}

export function getIO() {
  if (!io) throw new Error("Socket.io not initialized!");

  return io;
}
