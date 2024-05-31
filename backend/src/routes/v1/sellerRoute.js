const express = require('express');
const {fetchAllProductByUserId}=require('../../controllers/sellerController')


const router = express.Router();

router.get("/fetchAllProductByUserId/:userId",fetchAllProductByUserId);



module.exports = router;