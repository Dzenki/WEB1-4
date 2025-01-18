import personaModel from "../models/personaModel.js";
import fs from 'fs';

// add service item

const addService = async (req, res) => {
    
    let image_filename = `${req.file.filename}`;

    const service = new personaModel({
        ServiceName:req.body.ServiceName,
        NarrowServiceName:req.body.NarrowServiceName,
        ServicePriceName:req.body.ServicePriceName,
        ProgrammService:req.body.ProgrammService,
        InfoService:req.body.InfoService,
        Time:req.body.Time,
        Master:req.body.Master,
        Price:req.body.Price,
        ImageService:image_filename,
        ServiceCategory:req.body.ServiceCategory,
        NarrowServiceCategory:req.body.NarrowServiceCategory,
        ServicePriceCategory:req.body.ServicePriceCategory
    })
    try {
        await service.save();
        res.json({success:true, message:"Service Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// all food list
const listServices = async(req,res) => {
    try {
        const services = await personaModel.find({});
        res.json({success:true,data:services})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// remove service item

const removeService = async (req, res) => {
    try {
        const service = await personaModel.findById(req.body.id);
        fs.unlink(`upload/${service.ImageService}`, ()=>{})

        await personaModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Service removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


export {addService, listServices, removeService}