import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
   
    desc:{
        required:true,
        type:String,
    },
    title:{
        type:String,
        required:true,
    },
    creator:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    like:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],

},{
    timestamps:true
})

const Post=mongoose.model("Post",postSchema)


export default Post;