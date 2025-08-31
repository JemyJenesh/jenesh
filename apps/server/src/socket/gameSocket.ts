import type { GameIdParam, GameJoinInput } from "@/game/schema";
import { gameService } from "@/game/service";
import { playerService } from "@/player/service";
import type { Server, Socket } from "socket.io";

export function gameSocket(io: Server, socket: Socket) {
  socket.on("game:connect", (data: GameJoinInput) => {
    socket.join(`game:${data.gameId}`);
  });

  socket.on("game:join", async (data: GameJoinInput) => {
    await gameService.join(data);
    const player = await playerService.get(data.playerId);

    socket.nsp.to(`game:${data.gameId}`).emit("game:joined", player);
  });

  socket.on("game:start", async (data: GameIdParam) => {
    await gameService.start(data);

    socket.nsp.to(`game:${data.id}`).emit("game:started");
  });
}
