const express=require('express');
const router=express.Router();

const {updateExpense,deleteExpense,getExpenseById,createExpense,getExpenses}=require('../controllers/expenseController');

const {authMiddleware} =require('../middleware/authMiddleware');

router.get('/',authMiddleware,getExpenses);
router.post('/',authMiddleware,createExpense);
router.get('/:id',authMiddleware,getExpenseById);
router.delete('/:id',authMiddleware,deleteExpense);
router.put('/:id',authMiddleware,updateExpense);

module.exports=router;