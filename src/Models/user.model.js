const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const userSchema = new Schema({
    userName:{
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
    fullName:{
        type:String,
        require:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        require:true
    },
    coverImage:{
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
    if (!this.isModified('password')) {
        return next();
      }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(String(password),this.password)
}

userSchema.methods.accsessToken = async function() {
    try {
        const token = jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
                fullname: this.fullname
            },
            process.env.ACCSESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCSESS_TOKEN_EXPIRY }
        );
        console.log("Generated Access Token:", token);
        return token;
    } catch (error) {
        console.error("Error generating access token:", error);
        throw new Error("Failed to generate access token");
    }
};

userSchema.methods.RefreshToken = async function() {
    try {  
        const token = jwt.sign(
            { _id: this._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
        console.log("Generated Refresh Token:", token);
        return token;
    } catch (error) {
        console.error("Error generating refresh token:", error);
        throw new Error("Failed to generate refresh token");
    }
}; 

const User = new mongoose.model("User",userSchema)

module.exports = { User }