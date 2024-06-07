class logServiceController {
    // ToDo: сделать сервис по заданию
    async getUsers() {
        try {
            res.send("rabotaem");
        } catch (error) {
            console.log("Log Service Error!");
            res.status(500).send("Somethind was wrong! Уже чиним)");
        }
    }
}

module.exports = new logServiceController();