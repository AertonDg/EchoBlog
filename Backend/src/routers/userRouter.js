import { Router } from "express";

import { createUser, newprofile, getUsers } from "../controllers/userControllers.js";

import imageUpload from "../helpers/image-upload.js";
const router = Router();

router.post("/registro", createUser);
router.put("/:id", newprofile);
router.get("/", getUsers);



export default router;