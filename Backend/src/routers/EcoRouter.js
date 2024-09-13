import { Router } from "express";

import { CriarPost, Delete, getAll, getPost, image, updatePost, association } from "../controllers/EcoControllers.js";

import imageUpload from "../helpers/image-upload.js";
const router = Router();

router.post("/", imageUpload.single("image"), CriarPost);
router.get("/", getAll);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete('/:id', Delete);
router.post("/:id/imagem", image);
router.get("/?autor=:userI", association);

export default router