const express=require("express")
const {addProduct,fetchAllProduct,fetchProductByName,deleteProductByid}=require("../../controllers/productController")
const router=express.Router();

router.post("/addProduct",addProduct);
router.get("/fetchAllProduct",fetchAllProduct)
router.get("/fetchProductByName",fetchProductByName)

module.exports=router