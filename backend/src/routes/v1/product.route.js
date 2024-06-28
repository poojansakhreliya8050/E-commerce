const express = require("express");
const upload = require("../../middleware/multer.middleware");
const {
  addProduct,
  fetchAllProduct,
  fetchProductByName,
  fetchAllProductByCategoryId,
  fetchAllProductBySubCategoryId,
  deleteProductByid,
  changeProductState,
  fetchProductById,
  fetchProductByUserId,
  searchProducts
} = require("../../controllers/productController");
const router = express.Router();

router.post("/addProduct", upload.array('image', 10), addProduct);
router.get("/fetchAllProduct", fetchAllProduct);
router.get("/fetchAllProductByCategoryId/:categoryId",fetchAllProductByCategoryId);
router.get("/fetchAllProductBySubCategoryId/:subCategoryId",fetchAllProductBySubCategoryId);
router.get("/fetchProductByName", fetchProductByName);
router.delete("/deleteProductByid/:id", deleteProductByid);
router.put("/changeProductState/:productId", changeProductState);
router.get("/fetchProductById/:productId", fetchProductById);
router.get("/fetchProductByUserId/:userId",fetchProductByUserId)
router.get("/searchProducts",searchProducts)

module.exports = router;
