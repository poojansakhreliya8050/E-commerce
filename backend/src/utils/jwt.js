const { sign, verify } = require("jsonwebtoken")
const User = require("../models/userModel")


const createJwtToken=async(id,res)=>{
    const accessToken = sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s"
    })
    const refreshToken = sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })
    
        await User.updateOne({ _id: id}, { refreshToken: refreshToken });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "user/refresh_token"
    }) 

    return accessToken;
}

const isAuth = (req, res) => {
    // console.log(req);
    const authorization = req.headers["authorization"];
    if (!authorization) {
        // return res.send("user invalid");
        throw new Error("invalid user")
    }
    const token = authorization.split(" ")[1];
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        console.log(err);
        console.log("hello");
        console.log(decode?.id);
        if (err) return res.status(403).json({ message: "forbidden" })
        if (decode?.id != null) {
            return res.json({ message: "this is protected data.." })
        }
        return res.status(403).json({ message: "something error.." })
    })
}

module.exports={
    createJwtToken,
    isAuth
}