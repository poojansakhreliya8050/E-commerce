require("dotenv").config()
const {initSocket} = require('./utils/socket')
const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors")
const cookieParser = require("cookie-parser")
const session = require('express-session');
const morgan = require('morgan')
const http = require('http')

const {connectRabbitMQ} = require('./utils/rabbitmq')
const {startConsumer} = require('./utils/otpConsumer')

//passport
const passport = require('./utils/passport');

const api = require("./routes/index");

const app = express()
const server = http.createServer(app);

const io = initSocket(server)


app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}))
app.use(cookieParser())

//for logging
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
morgan.token('reqCookies', (req) => {
    return JSON.stringify(req.cookies);
});
morgan.token('host', (req) => {
    return JSON.stringify(req.hostname);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :body :reqCookies :host'));


//google auth
app.use(session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  
//   // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

app.use("/api", api)




async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, await console.log("mongodb connected.."));

        server.listen(process.env.PORT, async () => {
            console.log(`app listning on port ${process.env.PORT}`);
            await connectRabbitMQ()
            startConsumer()
        })
    } catch (err) {
        console.log(err);
    }
}

start()

