const express=require("express");
const upload=require("../../middleware/multer.middleware")
const {addSubCategory,fetchAllSubCategory,fetchSubCategoryByCateroryId,fetchSubCategoryById,updateSubCategory} =require("../../controllers/subCategoryController");


const router=express.Router()

router.post("/addSubCategory",upload.single("image"),addSubCategory);
router.get("/fetchAllSubCategory",fetchAllSubCategory);
router.get("/fetchSubCategoryByCateroryId/:categoryId",fetchSubCategoryByCateroryId);
router.get("/fetchSubCategoryById/:id",fetchSubCategoryById);
router.put("/updateSubCategory/:subCategoryId",upload.single("image"),updateSubCategory);


module.exports = router
