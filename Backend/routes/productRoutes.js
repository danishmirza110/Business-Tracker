const express=require('express');
const router=express.Router();
const {createProduct,getProducts,getProductById,deleteProduct,updateProduct}=require('../controllers/productController');
const  {authMiddleware}=require('../middleware/authMiddleware');


router.post('/',authMiddleware,createProduct);
router.get('/',authMiddleware,getProducts);
router.get("/:id",authMiddleware,getProductById);
router.delete("/:id",authMiddleware,deleteProduct);
router.put("/:id",authMiddleware,updateProduct);


module.exports=router;