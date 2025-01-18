import express from "express"
import { addService, listServices, removeService} from "../controllers/personaController.js";
import multer from "multer"

const personaRouter = express.Router();

//image storage engine

const services = multer.diskStorage({
    destination:"uploads",
    filename:(req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({services:services})

personaRouter.post("/add", upload.single("image"), addService)
personaRouter.get("/list", listServices)
personaRouter.post("/remove", removeService);



export default personaRouter;