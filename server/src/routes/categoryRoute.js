const express=require("express");

const router=express.Router()

const {addCategory,fetchAllCategory} =require("../controllers/categoryController");
router.post("/category",addCategory);
router.post("/fetchAllCategory",fetchAllCategory);


module.exports = router
