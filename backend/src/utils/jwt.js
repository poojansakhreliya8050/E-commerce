const { sign, verify } = require("jsonwebtoken")
const User = require("../models/user.model")


const createJwtToken = async (id) => {
    const accessToken = sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })
    const refreshToken = sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })

    // console.log("refrsh token from jwt : ",refreshToken);
    await User.updateOne({ _id: id }, { refreshToken: refreshToken },{ new: true });


    return {accessToken,refreshToken};
}

// const isAuth = async (req, res, next) => {
//     // console.log(req);
//     const authorization = req.headers["authorization"];
//     console.log(authorization);
//     // return res.send("user invalid");
//     if (!authorization) {
//         return res.status(403).json({ message: "user not found" })
//     }
//     const token = authorization.split(" ")[1];
//     verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
//         // console.log(err);
//         // console.log(decode?.id);
//         if (err) return res.status(403).json({ message: "forbidden" })
//         if (decode?.id != null) {
//             const user = await User.findOne({ _id: decode.id });
//             if (!user) {
//                 return res.status(403).json({ message: "user not found" })
//             }
//             next();
//         }
//         return res.status(403).json({ message: "something error.." })
//     })
// }

const isAuth=(req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            let id = decoded.id
            const user = await User.findOne({ _id :id})
            if (!user) {
                return res.status(403).json({ message: 'User not found' })
            }
            next()
        }
    )
}

module.exports = {
    createJwtToken,
    isAuth
}