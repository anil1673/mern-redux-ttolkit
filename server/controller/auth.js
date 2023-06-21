import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)
        if (username == "" || email == "" || password == "") {
            res.status(402).json({
                error: true,
                msg: "please, fill all field"
            })
        } else {
            const hashSalt=10;
            const hashPass = await bcrypt.hash(password, hashSalt);
            
            console.log("222")
            const isEmailAvailable = await User.findOne({ email: email });
            console.log("333")
            if (isEmailAvailable) {
                
                res.status(402).json({
                    error: true,
                    msg: "email already available"
                })
            } else {
                console.log("444")
                const newUser = new User({
                    username, email, password:hashPass
                })

                await newUser.save().then((user) => {
                    res.status(200).json({
                        error: false,
                        msg: "user registered successfully",
                        user: user
                    });

                }).catch((error) => {
                    res.status(200).json({
                        error: error,
                        msg: "user registeration failed",
                    });

                })
            }
        }
    } catch (error) {
        next(error);
    }
}


export const login=async(req,res,next)=>{
    try {
        const { email, password } = req.body;
        const isEmailAvailable = await User.findOne({ email }).then(async (user) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    // generate token
                    jwt.sign({ _id: user._id }, process.env.SECRET_KEY, (err, token) => {
                        if (err) {
                            res.status(400).json({ error: err });
                        
                        }else{
                            res.cookie("access_token",token,{
                                httpOnly:false
                            }).status(200).json({
                                user: user,
                                access_token: token,
                            })
                        }
                    })

                } else {
                    console.log("222")
                    res.status(400).json({ error: "wrong password" });
                }
            })

        }).catch((error) => {
            console.log("333")
            res.status(401).json({
                error: "email not found",
            })
        })

    } catch (error) {
        console.log("444")
        next(error)
    }
}


