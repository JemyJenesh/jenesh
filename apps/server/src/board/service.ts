import type { BoardUpdateInput } from "@/board/schema";
import { prismaClient } from "@/prisma";

const service = {
  get: async (id: string) => {
    return await prismaClient.board.findFirst({
      where: { id },
      include: {
        player: true,
        bingo: {
          include: {
            game: true,
          },
        },
      },
    });
  },

  update: async (data: BoardUpdateInput) => {
    return await prismaClient.board.update({
      where: { id: data.id },
      data,
    });
  },
};

export const boardService = service;
