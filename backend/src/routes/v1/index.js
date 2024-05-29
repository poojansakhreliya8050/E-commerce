const express = require("express");
const userRoute=require("./userRoute")
const categoryRoute=require("./categoryRoute")
const subCategoryRoute=require("./subCategoryRoute")
const productRoute=require("./productRoute")
const orderRoute=require("./orderRoute")
const cartRoute=require("./cartRoute")
const addressRoute=require("./addressRoute")

const router=express.Router()


router.use("/user",userRoute)
router.use("/category",categoryRoute)
router.use("/subCategory",subCategoryRoute)
router.use("/product",productRoute)
router.use("/order",orderRoute)
router.use("/cart",cartRoute)
router.use("/address",addressRoute)




module.exports=router