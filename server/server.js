const express=require('express')
const cors=require('cors')
const db=require("./db")
const cookieParser = require('cookie-parser')//this middle ware is necessary to handle cookies coming from front end for example for refreshing the token we wanted to have a cookie

const app = express()
app.use(cookieParser())




//middlewares
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(express.json())//for json data coming from front end 
//for cookie data coming from front end
//server 
app.listen(5000,()=>console.log("Server is up on port 5000"));

//Routes
app.use("",require("./routes/route"))//TODO LIST
app.use("/auth",require("./routes/authRoutes"))