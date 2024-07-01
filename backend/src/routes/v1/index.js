const express = require("express");
const userRoute=require("./user.route")
const categoryRoute=require("./category.route")
const subCategoryRoute=require("./subCategory.route")
const productRoute=require("./product.route")
const orderRoute=require("./order.route")
const cartRoute=require("./cart.route")
const addressRoute=require("./address.route")
const sellerRoute=require("./seller.route")
const reviewRoute=require("./review.route")
const feedbackRoute=require("./feedback.route")
const {isAuth} =require("../../utils/jwt")

const router=express.Router()


router.use("/user",userRoute)
router.use("/category",categoryRoute)
router.use("/subCategory",subCategoryRoute)
router.use("/product",productRoute)
router.use("/order",orderRoute)
router.use("/cart",isAuth,cartRoute)
router.use("/address",addressRoute)
router.use("/seller",sellerRoute)
router.use("/review",reviewRoute)
router.use("/feedback",feedbackRoute)




module.exports=router