const express = require("express");
const  teamControllers  = require("../Controllers/teamControllers");
const { registerUser } = require("../Controllers/user.controllers");
const { upload } = require("../Middlewere/multer.middlewere");
const routes = express.Router();

routes.post("/registers", upload.fields([{name:"avatar",maxCount:1},{name:"coverImage",maxCount:1}]), registerUser)
routes.post("/team", teamControllers.Create)

module.exports = routes;    