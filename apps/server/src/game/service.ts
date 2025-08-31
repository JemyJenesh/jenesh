import type {
  GameCreateInput,
  GameIdParam,
  GameJoinInput,
  GameUpdateInput,
} from "@/game/schema";
import { prismaClient } from "@/prisma";

const service = {
  get: async (id: string) => {
    const data = await prismaClient.game.findUnique({
      where: { id },
      include: {
        players: {
          include: {
            player: true,
          },
        },
      },
    });

    return {
      ...data,
      players: data?.players.map((p) => p.player) ?? [],
    };
  },

  create: async (data: GameCreateInput) => {
    return await prismaClient.game.create({
      data: {
        ...data,
        players: {
          create: {
            playerId: data.hostId,
          },
        },
      },
    });
  },

  update: async (data: GameUpdateInput) => {
    return await prismaClient.game.update({
      where: { id: data.id },
      data,
    });
  },

  join: async (data: GameJoinInput) => {
    const { gameId, playerId } = data;

    return await prismaClient.game.update({
      where: { id: gameId },
      data: {
        players: {
          create: {
            playerId,
          },
        },
      },
    });
  },

  start: async (data: GameIdParam) => {
    return await prismaClient.game.update({
      where: { id: data.id },
      data: {
        state: "STARTED",
      },
    });
  },
};

export const gameService = service;
