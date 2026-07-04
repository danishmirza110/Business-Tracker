const express= require('express');
const router=express.Router();

const {getDashboard,getRecentOrder,getLowStock,getMonthlyStats}=require('../controllers/dashboardController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.get('/',authMiddleware ,getDashboard);
router.get('/recent-orders',authMiddleware ,getRecentOrder);
router.get('/low-stock',authMiddleware ,getLowStock);
router.get('/monthly-stats',authMiddleware ,getMonthlyStats);

module.exports=router;