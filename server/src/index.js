const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config()

const userRoute=require("./routes/userRoute")

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }))
app.use(cookieParser())


app.use("/user",userRoute)


async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URL,await console.log("mongodb connected.."));

        app.listen(process.env.PORT, () => {
            console.log(`app listning on port ${process.env.PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
}

start()

