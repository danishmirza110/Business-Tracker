const mongoose=require("mongoose");


const orderSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"User",

  },
  productid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true,
  },
  productName:{
    type:String,
    required:true,
  },
  quantity:{
   type:Number,
   required:true,
  },
  customerName:{
    type:String,
    required:true,
  },
  customerPhone:{
    type:String,
  },
  totalAmount:{
   type:Number,
  }, 
  profit:{
    type:Number,
  },
  orderStatus:{
    type:String,
    enum:[
      "Pending",
      "Shipped",
      "Delivered",
      "Returned",
      "Cancelled",
    ],
    default:"Pending"
  },
  paymentStatus:{
    type:String,
    enum:[
     "Paid",
     "Unpaid"
    ],default:"Unpaid"
  },
},
{
  timestamps:true,
}
)

module.exports=mongoose.model("Order",orderSchema);