const express=require("express");
const upload=require("../../middleware/multer.middleware")

const router=express.Router()

const {addCategory,fetchAllCategory,fetchCategoryById,updateCategory} =require("../../controllers/categoryController");
router.post("/addCategory",upload.single("image"),addCategory);
router.get("/fetchAllCategory",fetchAllCategory);
router.get("/fetchCategoryById/:id",fetchCategoryById);
router.put("/updateCategory/:categoryId",upload.single("image"),updateCategory);


module.exports = router
