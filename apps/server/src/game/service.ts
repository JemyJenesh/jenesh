import type {
  GameCreateInput,
  GameIdParam,
  GameJoinInput,
  GameUpdateInput,
} from "@/game/schema";
import { generateBoard } from "@/lib/utils";
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
    const { id } = data;

    const game = await prismaClient.game.findUnique({ where: { id } });

    if (!game) return;

    if (game.type === "BINGO") {
      const startedGame = await prismaClient.game.update({
        data: {
          state: "STARTED",
          bingos: {
            create: {
              history: [],
            },
          },
        },
        where: { id, hostId: game.hostId },
        include: { bingos: true, players: true },
      });

      const bingoId = startedGame.bingos[0].id;

      for (const player of startedGame.players) {
        await prismaClient.board.create({
          data: {
            bingoId,
            playerId: player.playerId,
            cells: generateBoard(),
          },
        });
      }
    }

    return await prismaClient.game.update({
      where: { id: data.id },
      data: {
        state: "STARTED",
      },
    });
  },
};

export const gameService = service;
