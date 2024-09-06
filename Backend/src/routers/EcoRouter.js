import { Router } from "express";

import { CriarPost, Delete, getAll, getPost, image, updatePost } from "../controllers/EcoControllers.js";

const router = Router();

router.post("/", CriarPost);
router.get("/", getAll);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete('/:id', Delete);
router.post("/:id/imagem", image);

export default router