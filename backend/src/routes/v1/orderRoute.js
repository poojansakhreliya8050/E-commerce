const express=require("express");
const {addToOrder,getOrders,getOrder} = require("../../controllers/orderController");
const router=express.Router()

router.post("/addToOrder",addToOrder)
router.get("/getOrders/:userId",getOrders)
router.get("/getOrder/:orderId",getOrder)

module.exports=router