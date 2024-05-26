const express=require("express");

const router=express.Router()

const {addToCart,getCart,removeFromCart,emptyCart,removeItemFromCart} =require("../../controllers/cartController");

router.post("/addToCart",addToCart);
router.post("/removeFromCart",removeFromCart);
router.get("/getCart/:userId",getCart);
router.post("/removeItemFromCart",removeItemFromCart);
router.delete("/emptyCart/:userId",emptyCart);

module.exports = router
