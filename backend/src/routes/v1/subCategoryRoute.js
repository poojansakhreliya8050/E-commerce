const express=require("express");
const upload=require("../../middleware/multer.middleware")
const {addSubCategory,fetchAllSubCategory,fetchSubCategoryByCateroryId} =require("../../controllers/subCategoryController");


const router=express.Router()

router.post("/addSubCategory",upload.single("image"),addSubCategory);
router.get("/fetchAllSubCategory",fetchAllSubCategory);
router.get("/fetchSubCategoryByCateroryId/:categoryId",fetchSubCategoryByCateroryId);


module.exports = router
