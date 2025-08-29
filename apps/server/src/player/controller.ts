import {
  playerCreateInputSchema,
  playerUpdateInputSchema,
} from "@/player/schema";
import { playerService } from "@/player/service";
import type { Request, Response } from "express";

const controller = {
  getMe: async (req: Request, res: Response) => {
    const id = req.cookies.playerId;

    if (!id) {
      return res.status(404).json();
    }

    const data = await playerService.get(id);

    if (!data) {
      res.cookie("playerId", id, {
        httpOnly: true,
        maxAge: 0,
      });

      return res.status(404).json();
    }

    return res.json(data);
  },

  get: async (req: Request, res: Response) => {
    const id = req.params.id;

    const data = await playerService.get(id);

    if (!data) {
      return res.status(404);
    }

    return res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const body = playerCreateInputSchema.parse(req.body);

    const data = await playerService.create(body);

    res.cookie("playerId", data.id, {
      httpOnly: true,
      expires: new Date("9999-12-31T23:59:59Z"),
    });

    return res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const body = playerUpdateInputSchema.parse(req.body);

    const data = await playerService.update(body);

    return res.json(data);
  },
};

export const playerController = controller;
