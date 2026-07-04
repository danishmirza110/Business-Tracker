const mongoose=require("mongoose");

const expenseSchema=new mongoose.Schema({
  user:{
    type:String,
    ref:"User",
    require:true,
  },
  title:{
    type:String,
    required:true,
  },
  amount:{
   type:Number,
   required:true,
  },
  category:{
    type:String,
    enum:[
      "Packaging",
      "Courier",
      "Ads",
      "Misc"
    ],
    default:"Misc",
  },
  },
  {
    timestamps:true,
  }
)

module.exports=mongoose.model("Expenses",expenseSchema);