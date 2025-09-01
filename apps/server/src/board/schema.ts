import z from "zod";

export const boardSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  cells: z.string().array(),
  bingoId: z.string(),
});
export type Board = z.infer<typeof boardSchema>;

export const boardUpdateInputSchema = boardSchema.partial().required({
  id: true,
});
export type BoardUpdateInput = z.infer<typeof boardUpdateInputSchema>;
