const { sign, verify } = require("jsonwebtoken")
const User = require("../models/user.model")


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
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        sameSite: "none", // cross-site access
        secure: true // https
    }) 

    return accessToken;
}

const isAuth = (req, res) => {
    // console.log(req);
    const authorization = req.headers["authorization"];

    // return res.send("user invalid");
    if (!authorization) {
        throw new Error("invalid user") 
    }

    const token = authorization.split(" ")[1];
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        // console.log(err);
        // console.log(decode?.id);
        if (err) return res.status(403).json({ message: "forbidden" })

        if (decode?.id != null) {
            const user= User.findOne({ _id: decode.id });
            if(!user)
            {
                return res.status(403).json({ message: "user not found" })
            }
            return res.json({ message: "this is protected data.." })
        }

        return res.status(403).json({ message: "something error.." })
    })
}

module.exports={
    createJwtToken,
    isAuth
}