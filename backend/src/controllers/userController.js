const bcrypt = require('bcrypt');
const User = require("../models/userModel")

const UserOtp = require("../models/userOtpModel")
const { sendEmail } = require("../utils/sendEmail")
const { sign, verify } = require("jsonwebtoken");
const { createJwtToken } = require('../utils/jwt');

//for create user(signup)
const createUser = async (req, res) => {
    try {
        console.log(req.body,"create....");

        // user exist or not
        const userExist = await User.findOne({ email: req.body.email.toLowerCase() })
        if (userExist) {
            return res.status(208).json({ message: "user already exist" })
        }

        //generate otp
        let otp = '';
        for (let i = 0; i < 4; i++) {
            otp += Math.floor(Math.random() * 10);
        }

        // send otp through email
        await sendEmail(req.body.email, otp);

        //otp store in userotp collection
        const userOtp = await UserOtp.create({ email: req.body.email.toLowerCase(), otp: otp })

        //hash password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

        //create user in database
        // const user = user({name:req.body.name,email: req.body.email, password: hashPassword})
        // await user.save()
        const user = await User.create({ name: req.body.name, email: req.body.email.toLowerCase(), password: hashPassword })
        console.log(user);

        return res.status(200).json(user)
    }
    catch (err) {
        console.log(err + "haha");
    }
}

//for login user
const loginUser = async (req, res) => {
    try {
        console.log(req.body);

        // user exist or not
        let user = await User.findOne({ email: req.body.email.toLowerCase() })
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        //password check
        const matchPassword = await bcrypt.compare(req.body.password, user.password)
        if (!matchPassword) {
            return res.status(404).json({ message: "user not found" })
        }

        //check if user verify or not
        if (user.isVerify == false) {

                //generate otp
                let otp = '';
                for (let i = 0; i < 4; i++) {
                    otp += Math.floor(Math.random() * 10);
                }

                // send otp through email
                await sendEmail(req.body.email, otp);


                //insert otp in userotp table
                const userOtp = await UserOtp.updateOne({email:req.body.email.toLowerCase()}, {$set: { otp: otp }}, {upsert: true})

            
            return res.status(203).json(user)

        }

        console.log(user);

        id = user._id
        //create accesstoken and refreshtoken
        const accessToken = await createJwtToken(id, res)

        user = await User.findOne({ email: req.body.email })
        return res.status(200).json({ userdata: user, accessToken: accessToken })

    }
    catch (err) {
        console.log(err);
    }
}

const verifyUser = async (req, res) => {

    try {
        console.log(req.body);

        //found user
        const userExist = await UserOtp.findOne({ email: req.body.email })
        if (!userExist) {
            return res.status(404).json({ message: "user not exist!" })
        }

        //otp match
        if (req.body.otp != userExist.otp) {
            return res.status(406).json({ message: "otp wrong!" })
        }

        //update user isverify
        await User.updateOne({ email: req.body.email }, { isVerify: true });
        await UserOtp.deleteMany({ email: req.body.email })
        let user = await User.findOne({ email: req.body.email })

        console.log(user);

        id = user._id
        //create accesstoken and refreshtoken
        const accessToken = await createJwtToken(id, res)
        user = await User.findOne({ email: req.body.email })

        return res.status(200).json({ userdata: user, accessToken: accessToken })

    } catch (err) {
        console.log(err);
    }
}

const userLogout = async (req, res) => {
    res.clearCookie("refreshToken", { path: "/refresh_token" })
    console.log(req.cookies);
    return res.status(200).json({"message":"user sucessfully logout.."});
}

const createRefreshToken = async (req, res) => {
    try
    {
    const token = req.cookies.refreshToken;
    console.log(req.cookies);
    //token exist ?
    if (!token) {
        return res.send({ accessToken: null })
    }
    let payload = null;

    //refreshToken valid ?
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
    }
    catch (err) {
        res.send(err)
    }

    const user = await User.findOne({ _id: payload?.id })
    //user exist ?
    if (!user) {
        return res.send({ accessToken: "" })
    }
    //refreshToken exist ?
    if (user.refreshToken !== token) {
        return res.send({ accessToken: "" })
    }
    id = user._id
    const accessToken = await createJwtToken(id, res)
    // return res.send({ accessToken });
    console.log(accessToken);
    return res.status(200).json({ userdata: user, accessToken: accessToken })
}
catch(e)
{
    console.log("Error from createRefreshToken!!",e);
}

}

const fetchAllUser = async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(200).json(allUser)
    } catch (err) {
        console.log(err);
    }
}

const fetchUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
    }
}

const deleteUserByEmail = async (req, res) => {
    try {
        await User.deleteOne({ email: req.params.email })
        res.status(200).json({message:`delete user : ${req.params.email}`})
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    createUser,
    loginUser,
    verifyUser,
    userLogout,
    createRefreshToken,
    fetchAllUser,
    fetchUserByEmail,
    deleteUserByEmail,
}