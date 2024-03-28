const express=require("express");
const upload=require("../../middleware/multer.middleware")

const router=express.Router()

const {addCategory,fetchAllCategory} =require("../../controllers/categoryController");
router.post("/addCategory",upload.single("image"),addCategory);
router.get("/fetchAllCategory",fetchAllCategory);


module.exports = router
