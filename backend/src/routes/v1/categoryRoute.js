const express=require("express");

const router=express.Router()

const {addCategory,fetchAllCategory} =require("../../controllers/categoryController");
router.post("/addCategory",addCategory);
router.get("/fetchAllCategory",fetchAllCategory);


module.exports = router
