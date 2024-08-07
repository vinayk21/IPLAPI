const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const logger = require("../src/Constants/logger");
const { connectDB } = require("./Config/db");
const routes = require("./Routes/apiroutes");
const bodyParser = require("body-parser"); 
dotenv.config()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
connectDB()

app.use("/api/v1/users",routes)

app.listen(3200,()=>logger.info("Server is Running"))