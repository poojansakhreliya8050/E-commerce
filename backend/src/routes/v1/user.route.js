const express=require("express")
const router = express.Router()
const {createUser,loginUser,verifyUser,userLogout,createRefreshToken,fetchAllUser,fetchUserByEmail,deleteUserByEmail,changePassword,forgetPassword,resetPassword}=require("../../controllers/userController")

router.post("/createUser",createUser)
router.post("/loginUser",loginUser)
router.post("/verifyUser",verifyUser)
router.get("/logout",userLogout)
router.get("/refresh_token",createRefreshToken)
router.post("/changePassword",changePassword)
router.post("/forgetPassword",forgetPassword)
router.post("/resetPassword",resetPassword)

// router.get("/google")

router.get("/fetchAllUser",fetchAllUser)
router.get("/fetchUserByEmail/:email",fetchUserByEmail)
router.delete("/deleteUserByEmail/:email",deleteUserByEmail)





module.exports = router