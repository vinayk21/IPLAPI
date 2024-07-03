const express = require("express");
const  teamControllers  = require("../Controllers/teamControllers");
const routes = express.Router();

routes.get("/players",)
routes.post("/team", teamControllers.Create)

module.exports = routes;    