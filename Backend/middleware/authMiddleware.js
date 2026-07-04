const jwt=require("jsonwebtoken")
require('dotenv').config();
const User=require('../models/User');

const authMiddleware=async(req,res,next)=>{
  try{
    const authHeader=req.headers.authorization;
    if(!authHeader){
      return res.status(401).json({
        message:"No web token provided"
      });
    }
    
    console.log("Authorization Header:", req.headers.authorization);

    const token=authHeader.split(" ")[1];
    console.log("Token:", token);
    
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const user=await User.findById(decoded.id).select("-password");
    if(!user){
      return res.status(401).json({
        message:"User not found"
      })
    }
    req.user=user;
    next();
    console.log("logged User",user);
  }catch(err){
    console.log("Middleware Error",err)
    return res.status(401).json({
      message:err.message,   
    })
  } 
}

module.exports={authMiddleware};