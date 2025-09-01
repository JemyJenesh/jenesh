import { playerSchema } from "@/player/schema";
import { z } from "zod";

export const gameTypeSchema = z.enum(["BINGO"]);
export type GameType = z.infer<typeof gameTypeSchema>;

export const gameStateSchema = z.enum(["WAITING", "STARTED", "OVER"]);
export type GameState = z.infer<typeof gameStateSchema>;

export const gameSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  type: gameTypeSchema,
  state: gameStateSchema.default("WAITING").optional(),
  hostId: z.string(),
  winnerId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Game = z.infer<typeof gameSchema>;

export const gameCreateInputSchema = gameSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type GameCreateInput = z.infer<typeof gameCreateInputSchema>;

export const gameUpdateInputSchema = gameSchema.partial().required({
  id: true,
});
export type GameUpdateInput = z.infer<typeof gameUpdateInputSchema>;

export const gameJoinInputSchema = z.object({
  gameId: z.string(),
  playerId: z.string(),
});
export type GameJoinInput = z.infer<typeof gameJoinInputSchema>;

export const gameIdParamSchema = z.object({ id: z.string() });
export type GameIdParam = z.infer<typeof gameIdParamSchema>;

export const gameResponseSchema = gameSchema.extend({
  players: playerSchema.array(),
});
export type GameResponse = z.infer<typeof gameResponseSchema>;
