import { Router } from "express";

import { CriarPost } from "../controllers/EcoControllers.js";

const router = Router();

router.post("/postagens", CriarPost)

export default router