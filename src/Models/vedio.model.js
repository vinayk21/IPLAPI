import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vedioSchema = new Schema({
    vedioFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        require:true, 
       },
    description:{
        type:String,
        required: true
       },
    durations:{
        type:Number,
        required: true,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished :{
        type: Boolean,
        default: true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true}
)

vedioSchema.plugin(mongooseAggregatePaginate)

export const Vedio = new mongoose.model("Vedio",vedioSchema)
