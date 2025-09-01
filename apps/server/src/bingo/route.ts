import { bingoController } from "@/bingo/controller";
import { Router } from "express";

const router = Router();

router.get("/", bingoController.get);

export const bingoRouter: Router = router;
