import z from "zod";

export const playerSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Name is required.")
    .min(3, { message: "Name must be at least 3 characters." }),
  avatar: z.string().nonempty("Please select an avatar"),
});

export const playerCreateInputSchema = playerSchema.omit({ id: true });
export const playerUpdateInputSchema = playerSchema
  .partial()
  .required({ id: true });

export type Player = z.infer<typeof playerSchema>;
export type PlayerCreateInput = z.infer<typeof playerCreateInputSchema>;
export type PlayerUpdateInput = z.infer<typeof playerUpdateInputSchema>;
