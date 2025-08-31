import { gameController } from "@/game/controller";
import { Router } from "express";

const router = Router();

router.get("/:id", gameController.get);
router.post("/", gameController.create);
router.put("/", gameController.update);
router.post("/join", gameController.join);
router.post("/start", gameController.start);

export const gameRouter: Router = router;
