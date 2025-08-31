import type { BingoResponse } from "@/bingo/schema";
import { prismaClient } from "@/prisma";

const service = {
  get: async (gameId: string, playerId: string) => {
    const data = await prismaClient.bingo.findFirst({
      where: { gameId },
      include: {
        game: true,
        boards: {
          where: {
            playerId,
          },
        },
      },
    });

    if (!data) return;

    const { boards, ...rest } = data;

    const result: BingoResponse = {
      ...rest,
      history: data.history as string[],
      board: { ...data.boards[0], cells: data.boards[0].cells as string[] },
    };

    return result;
  },
};

export const bingoService = service;
