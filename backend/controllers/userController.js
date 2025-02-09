const userModel =require('../models/userModel')
const jwt =require('jsonwebtoken')
const bcrypt =require('bcryptjs')
const validator =require('validator')
const dotenv=require('dotenv')

dotenv.config()

let loggedInEmail = null;
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const emailexist=await userModel.findOne({email});
        if(emailexist){
            return res.json({success:false,message:"User already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user=await newUser.save()
        const token=createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Incorrect Password"})
        }
        const token=createToken(user._id)
        loggedInEmail = email;
        res.json({success:true,token})
    } catch (error) {
        return res.json({success:false,meassage:error.message})
    }
}
const getUserbyEmail=async(req,res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.json({ success: false, message: "Unauthorized access" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

module.exports={registerUser,loginUser,getUserbyEmail}