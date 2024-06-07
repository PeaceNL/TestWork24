const express = require("express");
const api = express.Router();
const userService = require('./userService/userService');
const logService = require("./logService/logService");


// Endpoint to different services :   /userService /logService
api.use("/userService", userService);
api.use("/logService", logService);

module.exports = api;