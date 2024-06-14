const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors")
const cookieParser = require("cookie-parser")
const morgan = require('morgan')

require("dotenv").config()

const api=require("./routes/index");

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin:['http://localhost:3000', 'http://localhost:3001','http://localhost:3002'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }))
app.use(cookieParser())
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  
  morgan.token('reqCookies', (req) => {
    return JSON.stringify(req.cookies);
  });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :body :reqCookies '));
app.use("/api",api)


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

