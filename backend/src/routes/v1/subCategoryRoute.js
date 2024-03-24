const express=require("express");

const router=express.Router()

const {addSubCategory,fetchAllSubCategory} =require("../../controllers/subCategoryController");
router.post("/addSubCategory",addSubCategory);
router.get("/fetchAllSubCategory",fetchAllSubCategory);


module.exports = router
