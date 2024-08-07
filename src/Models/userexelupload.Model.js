const mongoose = require("mongoose");


const uploadExelSchema = new mongoose.Schema({
    email:{
         type:String,
         unique:true,
         required:true,
         lowecase:true,
         trim:true,
         index:true
        },
    userName:{
        type:String,
        unique:true,
        required:true,
        lowecase:true,
        trim:true,
        index:true
    },
    subject:{
        type:String,
        lowercase:true
    },
    totalMarks:{
        type:Number,
        required:true,
        trim:true
    }},
{timestamps:true}
)

const USEREXELMODEL =  mongoose.model("USEREXELMODEL",uploadExelSchema)

module.exports = { USEREXELMODEL }
