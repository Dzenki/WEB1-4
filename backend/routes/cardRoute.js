import express from "express"
import {addToCard, removeFromCard, getCard} from "../controllers/cartController.js"
import multer from "multer"
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCard)
cartRouter.post("/remove", authMiddleware, removeFromCard)
cartRouter.post("/get", authMiddleware, getCard)


export default cartRouter;