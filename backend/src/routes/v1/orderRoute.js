const express=require("express");
const { createOrder, fetchAllOrder, fetchOrderByUserId } = require("../../controllers/orderController");
const router=express.Router()

router.post("/createOrder",createOrder);
router.get("/fetchAllOrder",fetchAllOrder);
router.get("/fetchOrderByUserId",fetchOrderByUserId);

module.exports=router