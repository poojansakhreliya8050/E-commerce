const express = require("express");
const userRoute=require("./userRoute")
const categoryRoute=require("./categoryRoute")
const productRoute=require("./productRoute")
const orderRoute=require("./orderRoute")

const router=express.Router()

router.use("/user",userRoute)
router.use("/category",categoryRoute)
router.use("/product",productRoute)
router.use("/order",orderRoute)



module.exports=router