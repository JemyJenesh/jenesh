import type { Board } from "@/board/schema";
import { boardService } from "@/board/service";
import { gameService } from "@/game/service";
import { checkForBingo } from "@/lib/utils";
import type { Player } from "@/player/schema";
import type { Server, Socket } from "socket.io";

export function bingoSocket(io: Server, socket: Socket) {
  socket.on("bingo:mark", async (data: { cell: string; boardId: string }) => {
    const { boardId } = data;
    const board = await boardService.get(boardId);

    if (!board) return;
    const isOver = board.bingo.game.state === "OVER";

    const cells = board.cells as string[];
    const updateCells = cells.map((cell) =>
      cell === data.cell ? `${data.cell.split("_")[0]}_1` : cell
    );

    await boardService.update({
      id: boardId,
      cells: updateCells,
    });

    if (!isOver && checkForBingo(updateCells)) {
      await gameService.over(board.bingo.gameId, board.playerId);

      const gameOverResponse: { player: Player; board: Board } = {
        player: board.player,
        board: {
          id: board.id,
          cells: updateCells,
          bingoId: board.bingoId,
          playerId: board.playerId,
        },
      };

      socket.nsp
        .to(`game:${board.bingo.gameId}`)
        .emit("game:over", gameOverResponse);
    }
  });
}
