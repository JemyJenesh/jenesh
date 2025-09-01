import { socket } from "@/lib/socket";

export function bingoMark(data: { cell: string; boardId: string }) {
  socket.emit("bingo:mark", data);
}
