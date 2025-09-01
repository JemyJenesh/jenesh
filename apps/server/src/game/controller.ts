import {
  gameCreateInputSchema,
  gameIdParamSchema,
  gameUpdateInputSchema,
} from "@/game/schema";
import { gameService } from "@/game/service";
import type { Request, Response } from "express";

const controller = {
  get: async (req: Request, res: Response) => {
    const params = gameIdParamSchema.parse(req.params);

    const data = await gameService.get(params.id);

    if (!data) {
      return res.status(404).json();
    }

    return res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const body = gameCreateInputSchema.parse(req.body);

    const data = await gameService.create(body);

    return res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const body = gameUpdateInputSchema.parse(req.body);

    const data = await gameService.update(body);

    return res.json(data);
  },
};

export const gameController = controller;
