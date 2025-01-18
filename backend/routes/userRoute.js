import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"
import userModel from "../models/userModel.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/log", async(req,res) => {
    try {
        const services = await userModel.find({});
        res.json({success:true,data:services})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
})

export default userRouter;