const mongoose =require('mongoose');
require("dotenv").config();

async function connectDB(){
  try{
  await mongoose.connect("mongodb+srv://mirzadanishbaig:Shizuka%40123@businesstracker.8bwvm35.mongodb.net/BusinessTracker");
  console.log("Database connect Successfully")
}catch(err){
  console.log("Database connection failed:", err);
}

}

module.exports=connectDB;