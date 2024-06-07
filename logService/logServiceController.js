const pool = require("../db");
class logServiceController {
    // ToDo: сделать сервис по заданию
    async getStoryById(req, res) {
        try {
            const { id } = req.params;
            const getLog = await pool.query("SELECT * FROM log WHERE id = $1", [id]);
            //TO DO: Добавить ответь с офсетом;
            res.json({ message: "postranichno"});
        } catch (error) {
            console.log("Log getStoryById Service Error!");
            res.status(500).send("Somethind was wrong! Уже чиним)");
        }
    }
    async logger(req, res) {
        const {id, operation} = req.body;
        try {
            await pool.query("INSERT INTO log (login, log) VALUES ($1, $2)", [id, operation]);
            res.status(201).json({ message: "Log created!" });
        } catch (error) {
            console.log("Log Service Error!");
            res.status(500).send("Somethind was wrong! Уже чиним)");
        }
    }
}

module.exports = new logServiceController();