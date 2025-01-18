import fs from 'fs';
import responseModel from '../models/responseModel.js';


const responseForm = async (req, res) => {
    const { serviceId, response, name } = req.body;
    try {
        const newResponse = new responseModel({
            serviceId: serviceId,
            response: response,
            name: name
        })
        await newResponse.save()
        res.json({ success: true, message: "Отзыв отправлен" })
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

export default responseForm;