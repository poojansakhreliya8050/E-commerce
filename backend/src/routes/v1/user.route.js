const express = require("express")
const passport = require('passport');
const router = express.Router()
const { createUser, loginUser, verifyUser, userLogout, createRefreshToken, fetchAllUser, fetchUserByEmail, deleteUserByEmail, changePassword, forgetPassword, resetPassword } = require("../../controllers/userController")
const { createJwtToken } = require("../../utils/jwt")
const { verify } = require("jsonwebtoken")

router.post("/createUser", createUser)
router.post("/loginUser", loginUser)
router.post("/verifyUser", verifyUser)
router.get("/logout", userLogout)
router.get("/refresh_token", createRefreshToken)
router.post("/changePassword", changePassword)
router.post("/forgetPassword", forgetPassword)
router.post("/resetPassword", resetPassword)

router.get("/fetchAllUser", fetchAllUser)
router.get("/fetchUserByEmail/:email", fetchUserByEmail)
router.delete("/deleteUserByEmail/:email", deleteUserByEmail)

//google auth
// router.get("/google")

const determineRedirectURL = (req, res, next) => {
    console.log(req.query.origin);
    // Example: check if request is coming from customer or seller
    if (req.query.origin === 'http://localhost:3000') {
        req.session.redirectURL = `http://localhost:3000/`;
    }
    else if (req.query.origin === 'http://localhost:3001') {
        req.session.redirectURL = `http://localhost:3001/`;
    }
    else if (req.query.origin === 'http://localhost:3002') {
        req.session.redirectURL = `http://localhost:3002/`;
    }
    else {
        // res.status(404).json({ message: "invalid url" });
    }
    next();
};

router.get('/google', determineRedirectURL, passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: "/login", session: false }),
    async (req, res) => {
        // // Successful authentication, redirect home.
        const user = req.user;
        const id = user._id.toString()
        // console.log("userId : "+id);
        // console.log(req.headers.host);
        const { refreshToken } = await createJwtToken(id); // Assuming you have a method to generate JWT
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
            // sameSite: 'none', // cross-site access
            secure: false // https
        })
        // console.log("refresh_token : "+refreshToken);
        res.redirect(req.session.redirectURL);
    }
);


router.get('/google/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});

// router.get('/google/me',(req,res)=>{
//     let refreshToken=req.cookies.refreshToken

// })



module.exports = router