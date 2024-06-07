const pool = require("../db");
class logServiceController {
    
    async getStoryById(req, res) {
        const { id } = req.params;
        // console.log(id);
        const { page = 1, limit = 3 } = req.query;
        const offset = (page - 1) * limit;
        // console.log(page , limit);
        try {            
            const getLog = await pool.query("SELECT * FROM log WHERE user_id = $1 ORDER BY id ASC LIMIT $2 OFFSET $3", 
            [id, limit, offset]);
            console.log(getLog);
            //Ready: Добавить ответь с офсетом;
            res.status(200).json({ page, limit, logs: getLog.rows, countLog: getLog.rowCount});
        } catch (error) {
            console.log("Log getStoryById Service Error!");
            res.status(500).send("Somethind was wrong! Уже чиним)");
        }        
    }
    async logger(req, res) {
        const {id, operation} = req.body;
        try {
            await pool.query("INSERT INTO log (user_id, log) VALUES ($1, $2)", [id, operation]);
            res.status(201).json({ message: "Log created!" });
        } catch (error) {
            console.log("Log Service Error!");
            res.status(500).send("Somethind was wrong! Уже чиним)");
        }
    }
}

module.exports = new logServiceController();