import { bingoRouter } from "@/bingo/route";
import { gameRouter } from "@/game/route";
import { playerRouter } from "@/player/route";
import { Router } from "express";

export const router: Router = Router();

router.use("/players", playerRouter);
router.use("/games", gameRouter);
router.use("/bingos", bingoRouter);
