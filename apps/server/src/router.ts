import { gameRouter } from "@/game/route";
import { playerRouter } from "@/player/route";
import { Router } from "express";

export const router: Router = Router();

router.use("/players", playerRouter);
router.use("/games", gameRouter);
