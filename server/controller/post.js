import Post from "../model/post.js"

export const addPost=async(req,res,next)=>{
    try{
        const newPost=new Post({...req.body,
            creator: req.params.userid})

            await newPost.save().then((post)=>{
                res.status(200).json({
                    post:post
                })

            }).catch((error)=>{
                res.status(400).json({
                    msg:"post add error"
                })
            })

    }catch(error){
        next(error)
    }
}

export const getAllPost=async(req,res,next)=>{
    try{    
        const userId = req.params.userid;
        const posts = await Post.find({ creator: userId });
        res.status(200).json(posts)

    }catch(error){
        next(error)
    }
}

export const likePost=async(req,res,next)=>{
    try{
        const postid=req.params.postid
        const userid=req.params.userid
        const p=await Post.findById(req.params.postid);
        const postIndex=p.like.indexOf(userid);
        if(postIndex == -1){
            p.like.push(userid)
        }else{
            p.like.splice(userid,1);
        }
       await p.save().then(()=>{
        res.status(200).json({
            msg:"like success"
        })
       }).catch((error)=>{
        next(error)
       })

    }catch(error){
        next(error);
    }
}