const mongoose =require('mongoose');
require("dotenv").config();

async function connectDB(){
  try{
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Database connect Successfully")
}catch(err){
  console.log("Database connection failed:", err);
}

}

module.exports=connectDB;