import mongoose, { models } from "mongoose";
import { Schema } from "mongoose";
import {bcrypt} from 'bcrypt';
import {jwt} from 'jsonwebtoken';
const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowecase:true,
        trim:true,
    },
    fullname:{
        type:String,
        require:true,
        trim:true,
        index:true
    },
    avtar:{
        type:String,
        require:true
    },
    coverimage:{
        type:String
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        require:[true,'password is required']    
    },
    refreshToken:{
        type:String
    }
   },
   {timestamps:true}
)

userSchema.pre("save", async function(next){
 if(!this.isModified(this.password)) return next()
    this.password = bcrypt.hash(this.password,10)
   next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.accsessToken = async function(){
    jwt.sign({
        _id : this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCSESS_TOKEN_SECRET,
    {expireIn: process.env.ACCSESS_TOKEN_EXPIRY}
)
}

userSchema.methods.refreshToken = async function(){
    jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN,
    {expireIn: process.env.REFRESH_TOKEN_EXPIRY}
)
}

export const User = new mongoose.model("User",userSchema)