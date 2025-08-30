import { gameController } from "@/game/controller";
import { Router } from "express";

const router = Router();

router.get("/:id", gameController.get);
router.post("/", gameController.create);
router.put("/", gameController.update);

export const gameRouter: Router = router;
