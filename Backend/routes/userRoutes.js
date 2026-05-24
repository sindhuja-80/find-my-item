import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post("/login",loginUser)
// OTP verification removed — signup no longer requires email OTP
userRouter.get("/profile",authMiddleware,(req,res)=>{
    res.json({success:true,message:"Protected route accessed",userId:req.user})
})

export default userRouter