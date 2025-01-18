import express from "express"
import responseForm from "../controllers/responseController.js";
import responseModel from "../models/responseModel.js";


const responseRoute = express.Router()

responseRoute.post("/form", responseForm)
responseRoute.get("/info", async(req,res) => {
    try {
        const responses = await responseModel.find({});
        res.json({success:true,data:responses})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
})

export default responseRoute;