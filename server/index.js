import express from "express"
import dotenv from"dotenv";
dotenv.config({path:"../config.env"});
import cors from "cors"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app=express();
import "./db/conn.js"
import authRouter from "./route/auth.js";
import postRouter from "./route/Post.js";

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser())

// custom error management
app.use((err,req,res,next)=>{
    const errStatus=err.sataus || 500;
    const errMsg=err.message || "something went wrong";
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMsg,
        stack:err.stack,


    })
})


// route
app.use("/auth",authRouter)
app.use('/post',postRouter)


app.listen(5000,()=>{
    console.log("express connection successfull")
})