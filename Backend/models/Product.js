const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
  user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true,
  },
  productName:{
    type:String,
    required:true,
  },
  category:{
    type:String,
  },
  costPrice:{
    type:Number,
    required:true,
  },
  sellingPrice:{
    type:Number,
    required:true,
  },
  stock:{
    type:Number,
    default:0,
  },
  lowStockLimit:{
    type:Number,
    defaul:5,
  }
},
{
  timestamps:true,
}
)

module.exports=mongoose.model("Product",productSchema);