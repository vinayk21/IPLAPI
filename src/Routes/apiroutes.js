const express = require("express");
const  teamControllers  = require("../Controllers/teamControllers");
const { registerUser } = require("../Controllers/user.controllers");
const routes = express.Router();

routes.post("/registers", registerUser)
routes.post("/team", teamControllers.Create)

module.exports = routes;    