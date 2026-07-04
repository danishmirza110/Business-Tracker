const mongoose=require('mongoose');
const Expenses=require('../models/Expense')

const getExpenses=async(req,res)=>{
  try{
    const expense=await Expenses.find({
      user:req.user._id}
    );
    res.status(200).json(expense);
  }catch(err){
    res.status(200).json({
      message:err.message
    });
  }
}

const createExpense=async(req,res)=>{
  try{
    const expense=await Expenses.create({
    ...req.body,
    user:req.user._id}
    );
   res.status(201).json({
    message:"Expense Created Successfully"
  })
    }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}

const getExpenseById=async(req,res)=>{
  try{
  const expense=await Expenses.findById({
    _id:req.params.id,
    user:req.user._id,
});
  if(!expense){
    return res.status(404).json({
      message:"not such expense found"
    })
  }
  res.status(200).json({
    message:"expense fetched successfully"
  })
  }catch(err){
    res.status(500).json({
      message:err.message,
    })
  }
}

const deleteExpense=async(req,res)=>{
  try{
    const expense=await Expenses.findByIdAndDelete({
      _id:req.params.id,
      user:req.user._id
  });
    if(!expense){
      return res.status(404).json({message:"expense not available to delete"})
    }res.status(200).json({
      message:"Expense deleted Successfully"
    })
  }catch(err){
    res.status(500).json({
      message:err.message,
    })
  }
}

const updateExpense=async(req,res)=>{
  try{
  const expense=await Expenses.findByIdAndUpdate({
    _id:req.params.id,
    ...req.body,
    user:req.user._id
  })
  if(!expense){
    return res.status(404).json({message:"Exepense not found"})
  }res.status(200).json({message:"Expense Update Successfully"})
}catch(err){
  res.status(500).json({
    message:err.message,
  })
}
}

module.exports={updateExpense,deleteExpense,getExpenseById,createExpense,getExpenses}
