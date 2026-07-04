const express=require('express');
const Order=require('../models/Order');
const { getProductById } = require('./productController');
const Product = require('../models/Product');


const createOrder=async(req,res)=>{
  try{
  const {productid,customerName,customerPhone,quantity,orderStatus,paymentStatus}=req.body;
    const product= await Product.findById(productid);
    console.log(product);

  if(!product){
    return res.status(404).json({
      message:"product not available yet",
    })
  }
  if(product.stock<quantity){
    return res.status(400).json({
      message:"Out of Stock",
    })
  }
    const totalAmount=product.sellingPrice*quantity;
    
    const profit=(product.sellingPrice-product.costPrice)*quantity;


    const order=await Order.create({
      productid:product._id,
      productName:product.productName,
      customerName,
      customerPhone,
      quantity,
      totalAmount,
      profit,
      orderStatus,
      paymentStatus,
      user:req.user._id,
    });

    product.stock-=quantity;
    await product.save();
    res.status(201).json(order)
}catch(err){
  console.log(err);
  res.status(500).json({message:err.message})
}
};

const getOrders=async(req,res)=>{
  try{
    const orders=await Order.find({
      user:req.user._id,
    });
    res.status(200).json({
      count:orders.lengths,
      message:"orders fetched successfully",
      data:orders,
    })
  }catch(err){
    res.status(500).json({
      message:err.message,
    })
  }
}

const getOrderById=async(req,res)=>{
  try{
    const order=await Order.findById({
      _id:req.params.id,
      user:req.user._id,
  });
    if(!order){
      return res.status(404).json({
        success:false,
        message:"order not found",
      })
    }
    res.status(200).json(order)
  }catch(err){
    res.status(500).json({message:err.message})
  }
}

const deleteOrderById=async(req,res)=>{
  try{
  const order=await Order.findByIdAndDelete({
    _id:req.params.id,
    user:user.req._id,
  });
  if(!order){
    return res.status(404).json({
      message:"Product not found",
    })
  }
  res.status(200).json({
    success:true,
    message:"order deleted successfully"
  })
  }catch(err){
    res.status(500).json({message:err.message})
  }
};

const updateOrder=async(req,res)=>{
  try{
  const order=await Order.findByIdAndUpdate({
    _id:req.params.id,
    body:req.body,
    user:user.req._id,
  },
    {
      new:true,
    }
  );
  if(!order){
    return res.status(404).json({
      message:"order note found"
    })
  }res.status(200).json({message:"Order Update Successfully",data:order})
}catch(err){
  res.status(500).json({
    message:err.message,
  })
}
}

module.exports={getOrders,getProductById,createOrder,getOrderById,deleteOrderById,updateOrder};