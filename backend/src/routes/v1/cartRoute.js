const express=require("express");

const router=express.Router()

const {addToCart,getCart,removeFromCart} =require("../../controllers/cartController");

router.post("/addToCart",addToCart);
router.post("/removeFromCart",removeFromCart);
router.get("/getCart/:userId",getCart);

module.exports = router
