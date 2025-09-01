import type { BingoResponse, BingoUpdateInput } from "@/bingo/schema";
import { gameService } from "@/game/service";
import { pickBingoNumber } from "@/lib/utils";
import { prismaClient } from "@/prisma";
import { getIO } from "@/socket";

let intervalIDs: { [bingoID: string]: NodeJS.Timeout } = {};

const service = {
  get: async (gameId: string, playerId: string) => {
    const data = await prismaClient.bingo.findFirst({
      where: { gameId },
      include: {
        game: {
          include: {
            winner: true,
          },
        },
        boards: {
          where: {
            playerId,
          },
        },
      },
    });

    if (!data) return;

    const winnerBoard = data.game.winnerId
      ? (
          await prismaClient.bingo.findFirst({
            where: { gameId },
            select: {
              boards: {
                where: {
                  playerId: data.game.winnerId,
                },
              },
            },
          })
        )?.boards[0] ?? null
      : null;

    const { boards, ...rest } = data;

    const result: BingoResponse = {
      ...rest,
      history: data.history as string[],
      board: { ...data.boards[0], cells: data.boards[0].cells as string[] },
      winnerState:
        rest.game.winner !== null && !!winnerBoard
          ? {
              player: rest.game.winner,
              board: { ...winnerBoard, cells: winnerBoard.cells as string[] },
            }
          : null,
    };

    return result;
  },

  update: async (data: BingoUpdateInput) => {
    return await prismaClient.bingo.update({
      where: { id: data.id },
      data,
      select: {
        game: {
          select: {
            state: true,
          },
        },
      },
    });
  },

  start: async (gameId: string) => {
    const bingo = await prismaClient.bingo.findFirst({
      where: { gameId },
    });

    if (!bingo) return;

    let history = bingo.history as string[];

    intervalIDs[bingo.id] = setInterval(async () => {
      if (history.length < 57) {
        const newNumber = pickBingoNumber(history);
        history = [...history, newNumber];
        getIO().to(`game:${gameId}`).emit("bingo:number", newNumber);

        const {
          game: { state },
        } = await bingoService.update({
          id: bingo.id,
          history,
        });

        if (state === "OVER") {
          clearInterval(intervalIDs[bingo.id]);
        }
      } else {
        gameService.update({ id: gameId, state: "OVER" });
        clearInterval(intervalIDs[bingo.id]);
        getIO().to(`game:${gameId}`).emit("game:over");
      }
    }, 5000);
  },
};

export const bingoService = service;
