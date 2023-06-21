import mongoose from "mongoose";
import dotenv from"dotenv";
dotenv.config({path:"./config.env"});
const DB=process.env.DATABASE;
console.log(DB)

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongoose connection success")
}).catch((error)=>{
    console.log("mongoose connection error",error)
})