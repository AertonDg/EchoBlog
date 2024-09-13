import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path"
import { fileURLToPath } from "node:url";

import conn from "./src/config/conn.js";

import EcoRouter from "./src/routers/EcoRouter.js"
import userRouter from "./src/routers/userRouter.js"


const PORT = process.env.PORT || 3333;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

conn
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor on PORT: ${PORT}`);
        });
    })
    .catch((error) => console.error(error));


app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/postagens", EcoRouter);
app.use("/usuarios", userRouter);


app.use((request, response) => {
    response.status(404).json({ messaSge: "Rota não encontrada" });
});