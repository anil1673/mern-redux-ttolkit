import express from "express";
import { addPost, getAllPost, likePost } from "../controller/post.js";
const postRouter=express.Router();


postRouter.post("/addpost/:userid",addPost)
postRouter.get("/getallpost/:userid",getAllPost)
postRouter.put("/likepost/:userid/:postid",likePost)

export default postRouter