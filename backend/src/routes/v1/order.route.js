const express=require("express");
const {addToOrder,getOrders,getOrdersByUserId,getOrder,getOrderBySellerId,cancelledOrder,dispatchedOrder,onTheWayOrder,deliveredOrder,makePayment} = require("../../controllers/orderController");
const router=express.Router()

router.post("/addToOrder",addToOrder)
router.get("/getOrders",getOrders)
router.get("/getOrdersByUserId/:userId",getOrdersByUserId)
router.get("/getOrder/:orderId",getOrder)
router.get("/getOrderBySellerId/:sellerId",getOrderBySellerId)

//for order delivery status
router.patch("/cancelledOrder/:orderId",cancelledOrder)
router.patch("/dispatchedOrder/:orderId",dispatchedOrder)
router.patch("/onTheWayOrder/:orderId",onTheWayOrder)
router.patch("/deliveredOrder/:orderId",deliveredOrder)
router.post("/makePayment",makePayment)

module.exports=router