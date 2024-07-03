const mongoose = require("mongoose")

const playersSchema = new mongoose.Schema({
    name:{type:String, require:true},
    team:{type:String, require:true},
    role:{type:String, require:true},
    country:{type:String, require:true},
    age:{type:Number, require:true},
    matches:{type:Number, require:true},
    wickets:{type:Number, require:true},
    highestScore:{type:Number, require:true},
    bestBowling:{type:String, require:true},
    centuries:{type:Number, require:true},
    fifties:{type:Number, require:true},
    fiveWickets:{type:Number,require:true}
},
{timestamps:true}
)

const Player = mongoose.model('Player',playersSchema)

module.exports = { Player }

