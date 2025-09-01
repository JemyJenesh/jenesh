import { boardSchema } from "@/board/schema";
import { gameSchema } from "@/game/schema";
import { playerSchema } from "@/player/schema";
import { z } from "zod";

export const bingoSchema = z.object({
  id: z.string(),
  history: z.string().array(),
  gameId: z.string(),
});
export type Bingo = z.infer<typeof bingoSchema>;

export const bingoUpdateInputSchema = bingoSchema
  .partial()
  .required({ id: true });
export type BingoUpdateInput = z.infer<typeof bingoUpdateInputSchema>;

export const bingoIdParamSchema = z.object({ id: z.string() });
export type BingoIdParam = z.infer<typeof bingoIdParamSchema>;

export const bingoQuerySchema = z.object({
  gameId: z.string(),
  playerId: z.string(),
});
export type BingoQueryParam = z.infer<typeof bingoQuerySchema>;

export const bingoResponseSchema = bingoSchema.extend({
  board: boardSchema,
  game: gameSchema,
  winnerState: z
    .object({
      board: boardSchema,
      player: playerSchema,
    })
    .nullable(),
});
export type BingoResponse = z.infer<typeof bingoResponseSchema>;
