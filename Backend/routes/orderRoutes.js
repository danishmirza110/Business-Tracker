const express=require('express');
const router=express.Router();
const {getOrders, createOrder,getOrderById,deleteOrderById,updateOrder}=require('../controllers/orderController');
const {authMiddleware}=require('../middleware/authMiddleware')

router.get("/",authMiddleware,getOrders);
router.post("/",authMiddleware,createOrder);
router.put("/:id",authMiddleware,updateOrder);
router.delete("/:id",authMiddleware,deleteOrderById);
router.get("/:id",authMiddleware,getOrderById);

module.exports=router;