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
        try {
            const {login, password} = req.body;
            const user = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
            const updateUser = await pool.query("UPDATE users SET password = $1 WHERE login = $2", [login]);//TODO: SDELAT NORMALNO
            logger(user.rows[0].id, "Update")
        } catch (error) {
            console.log(`updateUser :` + error);
            res.status(500).json({ message: 'something was wrong(' })
        }
    }
    async getUsers (req, res) {
        try {
            const allUsers = await pool.query("SELECT login FROM users");
            
            res.json({ Users: allUsers.rows});
        } catch (error) {
            console.log(`getUsers :` + error);
            res.status(500).json({ message: 'something was wrong(' })
        }
    }
}

module.exports = new userServiceController();