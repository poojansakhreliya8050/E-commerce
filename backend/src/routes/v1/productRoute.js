const express=require("express")
const upload=require("../../middleware/multer.middleware")
const {addProduct,fetchAllProduct,fetchProductByName,fetchAllProductByCategoryId,fetchAllProductBySubCategoryId,deleteProductByid,changeProductState}=require("../../controllers/productController")
const router=express.Router();

router.post("/addProduct",upload.single("image"),addProduct);
router.get("/fetchAllProduct",fetchAllProduct)
router.get("/fetchAllProductByCategoryId/:categoryId",fetchAllProductByCategoryId)
router.get("/fetchAllProductBySubCategoryId/:subCategoryId",fetchAllProductBySubCategoryId)
router.get("/fetchProductByName",fetchProductByName)
router.delete("/deleteProductByid/:id",deleteProductByid)
router.put("/changeProductState/:productId",changeProductState)

module.exports=router