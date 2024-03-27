const express=require("express")
const router = express.Router()
const {createUser,loginUser,verifyUser,userLogout,createRefreshToken,fetchAllUser,fetchUserByEmail,deleteUserByEmail}=require("../../controllers/userController")

router.post("/createUser",createUser)
router.post("/loginUser",loginUser)
router.post("/verifyUser",verifyUser)
router.get("/logout",userLogout)
router.post("/refresh_token",createRefreshToken)

// router.get("/google")

router.get("/fetchAllUser",fetchAllUser)
router.get("/fetchUserByEmail/:email",fetchUserByEmail)
router.delete("/deleteUserByEmail/:email",deleteUserByEmail)


module.exports = router