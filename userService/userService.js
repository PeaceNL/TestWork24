const express = require("express");
const userServiceController = require("./userServiceController");
const userService = express.Router();

userService.get('/', (req,res) => {
    res.send("Вас Встречает сервис пользователей...");
})
// Отдаём контроллерам обрабатывать логику 

// TO DO: Сделать валидацию логина и пасса  
userService.post("/createuser", userServiceController.createUser);
userService.put("/updateuser", userServiceController.updateUser);
userService.get("/getusers", userServiceController.getUsers); 

module.exports = userService;