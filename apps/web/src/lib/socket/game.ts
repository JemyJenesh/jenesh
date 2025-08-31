import { socket } from "@/lib/socket";
import type { GameIdParam, GameJoinInput } from "@/schema/game";

export function gameConnect(data: GameJoinInput) {
  socket.emit("game:connect", data);
}

export function gameJoin(data: GameJoinInput) {
  socket.emit("game:join", data);
}

export function gameStart(data: GameIdParam) {
  socket.emit("game:start", data);
}
