import { bingoQuerySchema } from "@/bingo/schema";
import { bingoService } from "@/bingo/service";
import type { Request, Response } from "express";

const controller = {
  get: async (req: Request, res: Response) => {
    const query = bingoQuerySchema.parse(req.query);

    const data = await bingoService.get(query.gameId, query.playerId);

    if (!data) {
      return res.status(404).json();
    }

    return res.json(data);
  },
};

export const bingoController = controller;
