const express = require('express');
const upload = require("../../middleware/multer.middleware");


const {fetchAllProductByUserId,addSellerDetails,fetchSellerByUserId}=require('../../controllers/sellerController')


const router = express.Router();

router.get("/fetchAllProductByUserId/:userId",fetchAllProductByUserId);

const uploadFields = upload.fields([
    { name: 'brandImage', maxCount: 1 },
    { name: 'bankImage', maxCount: 1 },
    { name: 'panImage', maxCount: 1 },
  ]);
router.post("/addSellerDetails",uploadFields,addSellerDetails);
router.get("/fetchSellerByUserId/:userId",fetchSellerByUserId);



module.exports = router;