const express = require("express");
const  teamControllers  = require("../Controllers/teamControllers");
const { registerUser, logoutUser, loginUser } = require("../Controllers/user.controllers");
const { upload } = require("../Middlewere/multer.middlewere");
const { uploadExel } = require("../Controllers/uploadExel.Controller");
const { verifyJWT } = require("../Middlewere/auth.middlewere");
const routes = express.Router();

routes.post("/registers", upload.fields([{name:"avatar",maxCount:1},{name:"coverImage",maxCount:1}]), registerUser)
routes.post("/uploadexel", upload.single("exel"), uploadExel)
routes.post("/login", loginUser)
routes.post("/logout",verifyJWT, logoutUser)
routes.post("/team", teamControllers.Create)

module.exports = routes;    