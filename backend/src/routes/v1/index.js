const express = require("express");
const userRoute=require("./userRoute")
const categoryRoute=require("./categoryRoute")
const productRoute=require("./productRoute")

const router=express.Router()

router.use("/user",userRoute)
router.use("/category",categoryRoute)
router.use("/product",productRoute)


module.exports=router