const express = require("express");
const app = express();
const dotenv = require("dotenv");
const logger = require("../src/Constants/logger");
const { connectDB } = require("./Config/db");
const routes = require("./Routes/apiroutes");
const bodyParser = require("body-parser");
dotenv.config()
app.use(bodyParser.json());
connectDB()

app.use("/",routes)

app.listen(3200,()=>logger.info("Server is Running"))