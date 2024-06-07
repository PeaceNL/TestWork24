const { log } = require("console");
const pool = require("../db");
const logger = require('./reqToLogService');

class userServiceController {
    async createUser(req, res) {
        const { login, password } = req. body;
        try {            
            const user = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
            // Проверяем есть ли уже такой полльзователь в Базе данных
            if (user.rows.length > 0) {
                res.status(400).json({ message: "Пользователь с таким логином уже существует" });
            } else {
                await pool.query("INSERT INTO users (login, password) VALUES ($1, $2)", [login, password]);
                const newUser = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
                // console.log(newUser.rows[0].id);
                logger(newUser.rows[0].id, "Creating");                
                res.status(201).json({message: "User created!"});                
            } 
        } catch (error) {
            console.log(`createUser :` + error);
            res.status(500).json({ message: 'something was wrong(' });
        }
    }   
    async updateUser(req, res) {
        //Не совсем понятно что именно надо менять в пользователе и нужно ли сверять логин и пароль
        //Поэтому меня то что в голову пришло
        try {
            const {login, password, newLogin, newPassword} = req.body; 
            const user = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
            console.log(user.rows[0]);           
            
            if (user.rows.length === 0) {
                return res.status(404).json({ message: "User Not Found" });
            }
            if (newLogin && newPassword) {
                const a = await pool.query("UPDATE users SET password = $1, login = $2 WHERE id = $3", [newPassword, newLogin, user.rows[0].id]);
                logger(user.rows[0].id, "User change login and password");
                res.status(200).json({ message: "User update" });
            } else if (!newLogin && newPassword) {
                await pool.query("UPDATE users SET password = $1 WHERE id=$2", [newPassword, user.rows[0].id]);
                logger(user.rows[0].id, "User change password");
                res.status(200).json({ message: "User update" });
            } else {
                res.status(400).json({ message: "Bad Request!" });
            }
            
        } catch (error) {
            console.log(`updateUser :` + error);
            res.status(500).json({ message: 'something was wrong(' });
        }
    }
    async getUsers (req, res) {
        try {
            const allUsers = await pool.query("SELECT login FROM users");
            
            res.json({ Users: allUsers.rows});
        } catch (error) {
            console.log(`getUsers :` + error);
            res.status(500).json({ message: 'something was wrong(' });
        }
    }
}

module.exports = new userServiceController();