const express=require("express");
const upload=require("../../middleware/multer.middleware")
const {addSubCategory,fetchAllSubCategory,fetchSubCategoryByCateroryId,fetchSubCategoryById} =require("../../controllers/subCategoryController");


const router=express.Router()

router.post("/addSubCategory",upload.single("image"),addSubCategory);
router.get("/fetchAllSubCategory",fetchAllSubCategory);
router.get("/fetchSubCategoryByCateroryId/:categoryId",fetchSubCategoryByCateroryId);
router.get("/fetchSubCategoryById/:id",fetchSubCategoryById);


module.exports = router
