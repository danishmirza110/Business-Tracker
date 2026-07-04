const Order=require('../models/Order');
const Product=require('../models/Product');
const Expense=require('../models/Expense');

const getDashboard=async(req,res)=>{
  try{
  const totalOrder= await Order.countDocuments({user: req.user._id,});
  const totalProduct=await Product.countDocuments({user: req.user._id,});
  const pendingOrder=await Order.countDocuments({"orderStatus":"Pending",user: req.user._id,});

  const orders=await Order.find({user: req.user._id});
  console.log(orders);

  const totalRevenue=orders.reduce((sum,order)=>
   sum+order.totalAmount,0
  )

  const totalProfit=orders.reduce((sum,order)=>
    sum+order.profit,0
  )

  const expenses=await Expense.find({user: req.user._id,});
 
  const totalExpense=await expenses.reduce((sum,expense)=>
    sum+expense.amount,0
  )
  const netProfit=totalProfit-totalExpense;

  res.status(200).json({
    totalProduct,
    totalOrder,
    pendingOrder,
    totalRevenue,
    totalProfit,
    totalExpense,
    netProfit,
  })
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}

const getRecentOrder=async(req,res)=>{
  try{
    const orders=await Order.find({user: req.user._id,})
    .sort({createdAt:-1})
    .limit(5)
    res.status(200).json({
      orders,
      message:"Recent 5 orders"
    })
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}


const getMonthlyStats=async(req,res)=>{
  try{
     const stats = await Order.aggregate([
      {
        $match:{
          user:mongoose.Types.ObjectId(req.user._id,)
        }
      },
  {
    $group: {
      _id: {
        $month: "$createdAt"
      },
      totalRevenue: {
        $sum: "$totalAmount"
      },
      totalProfit: {
        $sum: "$profit"
      }
    }
  },
  {
    $sort: {
      _id: -1
    }
  }
]);
    res.status(200).json(stats)
    }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}

const getLowStock=async(req,res)=>{
  try{
  const products=await Product.find({
    user: req.user._id,
    stock:{$lte:10}
  });res.status(200).json({products,count:products.length})
}catch(err){
  res.status(500).json({
    message:err.message,
  })
}
}

module.exports={getDashboard,getRecentOrder,getLowStock,getMonthlyStats};