import "dotenv/config";
import express from "express";
import cors from "cors";

import conn from "./src/config/conn.js";

import EcoRouter from "./src/routers/EcoRouter.js"

const PORT = process.env.PORT || 3333;
const app = express();

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

app.use("/postagens", EcoRouter);


app.use((request, response) => {
                                                                         
    response.status(404).json({ messaSge: "Rota não encontrada" });
});