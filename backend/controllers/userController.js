import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async(req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,massage:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,massage:"Wrong password"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}
// register user

const registerUser = async(req, res) => {
    const {name, password, email, phone} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,massage:"User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,massage:"Please enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success:false,massage:"Please enter a strond password"})
        }

        if(phone.length < 11){
            return res.json({success:false,massage:"Please enter a phone number"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {loginUser, registerUser}