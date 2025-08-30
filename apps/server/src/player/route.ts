import { playerController } from "@/player/controller";
import { Router } from "express";

const router = Router();

router.get("/:id", playerController.get);
router.post("/", playerController.create);
router.put("/", playerController.update);

export const playerRouter: Router = router;
