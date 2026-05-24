import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    role:{
        type:String,default:"student"
    },
    isVerified:{type:Boolean,default:false},
    // OTP fields removed — email verification not required at registration
},{timestamps:true})
const User=mongoose.model("User",userSchema)
export default User