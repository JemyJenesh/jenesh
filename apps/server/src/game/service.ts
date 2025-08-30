import type { GameCreateInput, GameUpdateInput } from "@/game/schema";
import { prismaClient } from "@/prisma";

const service = {
  get: async (id: string) => {
    return await prismaClient.game.findUnique({
      where: { id },
    });
  },

  create: async (data: GameCreateInput) => {
    return await prismaClient.game.create({
      data,
    });
  },

  update: async (data: GameUpdateInput) => {
    return await prismaClient.game.update({
      where: { id: data.id },
      data,
    });
  },
};

export const gameService = service;
