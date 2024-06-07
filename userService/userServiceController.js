const pool = require("../db");

class userServiceController {
    async createUser(req, res) {
        const { login, password } = req. body;
        try {            
            const user = await pool.query("SELECT * FROM users WHERE login = $1", [login]);
            
            if (user.rows.length > 0) {
                res.status(400).json({ message: "Пользователь с таким логином уже существует" });
            } else {
                await pool.query("INSERT INTO users (login, password) VALUES ($1, $2)", [login, password]);
                await pool.query("INSERT INTO log (login, log) VALUES ($1, $2)", [login, "Creating"]);
                res.status(201).json({message: "User created!"});                
            } 
        } catch (error) {
            console.log(`createUser :` + error);
            res.status(500).json({ message: 'something was wrong(' });
        }
    }   
    async updateUser(req, res) {
        try {
            const {login} = req.body;
            const updateUser = await pool.query("UPDATE users SET password = $1 WHERE login = $2", [pass, login])
        } catch (error) {
            console.log(`updateUser :` + error);
            res.status(500).json({ message: 'something was wrong(' })
        }
    }
    async getUsers (req, res) {
        try {
            res.send("rabotaem");
        } catch (error) {
            console.log(`getUsers :` + error);
            res.status(500).json({ message: 'something was wrong(' })
        }
    }
}

module.exports = new userServiceController();