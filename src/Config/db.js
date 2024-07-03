const mongoose = require("mongoose");
const logger = require("../Constants/logger");
const Uri = process.env.MONGODBURI || 'mongodb://192.168.29.69:27017/IplTeam';
async function connectDB(){
  try{
    logger.info("Connecting To Database")
   await mongoose.connect(Uri, {useNewUrlParser: true, useUnifiedTopology: true })
    logger.info("Connected Succesfully")
  }catch(error){
    logger.error("errors while connecting with database",error)
  }
}


module.exports = { connectDB }