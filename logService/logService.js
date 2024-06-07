const express = require("express");
const logService = express.Router();
const logServiceController = require("./logServiceController");

// ToDo: Сделать ендпоинты по заданию и написать комменты)
// ToDo: сделать енд поинт на запись логов при запросе с userService - са

logService.get("/", (req, res) => {
    res.send("Вас встречает сервис логов...");
});
logService.get('/story/:id', logServiceController.getStoryById);
logService.post('/logger', logServiceController.logger);


module.exports = logService;