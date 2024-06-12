const express = require('express');
const upload = require("../../middleware/multer.middleware");


const {fetchAllProductByUserId,addSellerDetails,fetchSellerByUserId,approveSeller,rejectSeller,fetchAllPendingSeller,fetchAllApprovedSeller,fetchAllRejectedSeller}=require('../../controllers/sellerController')


const router = express.Router();

router.get("/fetchAllProductByUserId/:userId",fetchAllProductByUserId);

const uploadFields = upload.fields([
    { name: 'brandImage', maxCount: 1 },
    { name: 'bankImage', maxCount: 1 },
    { name: 'panImage', maxCount: 1 },
  ]);
router.post("/addSellerDetails",uploadFields,addSellerDetails);
router.get("/fetchSellerByUserId/:userId",fetchSellerByUserId);
router.get("/approveSeller/:userId",approveSeller);
router.get("/rejectSeller/:userId",rejectSeller);
router.get("/fetchAllPendingSeller",fetchAllPendingSeller);
router.get("/fetchAllApprovedSeller",fetchAllApprovedSeller);
router.get("/fetchAllRejectedSeller",fetchAllRejectedSeller);



module.exports = router;