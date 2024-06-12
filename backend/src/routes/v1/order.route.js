const express=require("express");
const {addToOrder,getOrders,getOrder,getOrderBySellerId,cancelledOrder,dispatchedOrder,onTheWayOrder,deliveredOrder } = require("../../controllers/orderController");
const router=express.Router()

router.post("/addToOrder",addToOrder)
router.get("/getOrders/:userId",getOrders)
router.get("/getOrder/:orderId",getOrder)
router.get("/getOrderBySellerId/:sellerId",getOrderBySellerId)

//for order delivery status
router.patch("/cancelledOrder/:orderId",cancelledOrder)
router.patch("/dispatchedOrder/:orderId",dispatchedOrder)
router.patch("/onTheWayOrder/:orderId",onTheWayOrder)
router.patch("/deliveredOrder/:orderId",deliveredOrder)

module.exports=router