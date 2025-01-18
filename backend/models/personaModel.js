import mongoose from "mongoose"

const personaSchema = new mongoose.Schema({
    ServiceName: {type:String, required: true},
    NarrowServiceName: {type:String, required:true},
    ServicePriceName: {type:String, required:true},
    ProgrammService: {type:String, required:true},
    InfoService: {type:String, required:true},
    Time: {type:String, required:true},
    Master: {type:String, required:true},
    Price: {type:Number, required:true},
    ImageService: {type:String, required:true},
    ServiceCategory: {type:String, required:true},
    NarrowServiceCategory: {type:String, required:true},
    ServicePriceCategory: {type:String, required:true}
});

const ServiceSchema = new mongoose.Schema({
    ServiceName: {type:String, required: true},
    ImageService: {type:String, required:true},
    ServiceCategory: {type:String, required:true},
})

const NarrowServiceSchema = new mongoose.Schema({
    
})

const personaModel = mongoose.models.persona || mongoose.model("persona", personaSchema);
export default personaModel;