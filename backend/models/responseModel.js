import mongoose from "mongoose";
import tedious from "tedious";

const responseSchema = new mongoose.Schema({
    serviceId: {type:String, required:true},
    response: {type:String, required:true},
    name: {type:String, required:true}
})

const responseModel = mongoose.models.response || mongoose.model("response", responseSchema);
export default responseModel;