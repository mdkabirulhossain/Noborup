import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//jwt token function
const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//Route for registration
const registerUser = async(req, res) =>{
    try{
        const{name, email, password} = req.body;

        //Checking user already exist or not 
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false, message:"User already exists"})
        }
        //email validator
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        //hassing user password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashPassword,
        })

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({success: true, token});

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//Route for login
const loginUser = async () =>{

}

//Rout for admin login
const adminLogin = async() =>{

}

export {loginUser, registerUser, adminLogin};