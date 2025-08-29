import type { PlayerCreateInput, PlayerUpdateInput } from "@/player/schema";
import prismaClient from "prisma";

const service = {
  get: async (id: string) => {
    return await prismaClient.player.findUnique({
      where: { id },
    });
  },

  create: async (data: PlayerCreateInput) => {
    return await prismaClient.player.create({
      data,
    });
  },

  update: async (data: PlayerUpdateInput) => {
    return await prismaClient.player.update({
      where: { id: data.id },
      data,
    });
  },
};

export const playerService = service;
