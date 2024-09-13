import multer from "multer";
import { request } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagestorage = multer.diskStorage({
    destination: (req, fole, cb) => {
        let folder = ""

        if (request.baseUrl.includes("usuarios")) {
            folder = "usuarios"
        } else if (request.baseUrl.includes("postagens")) {
            folder = "postagens"
        }
        cb(null, path.join(__dirname, "../public/${folder}"));
    },
    filename: (request, file, cb) => {

        cb(null, Date.now() +
            String(Math.floor(Math.random() * 10000)) +
            path.extname(file.originalname)
        );
    },
});

const imageUpload = multer({
    storage: imagestorage,
    fileFilter(request, file, cb) {
        if (file.originalname.match(/\.(png||jpg)$/)) {
            return cb(new Error("por favor, enviea penas png ou jpg"))
        }
        cb(null, true)
    }
});

export default imageUpload;