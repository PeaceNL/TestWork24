const express = require("express");
const app = express();
const api = require("./api");
const dotenv = require("dotenv");

dotenv.config();

PORT = process.env.PORT || 4000;

app.use(express.json());
// Перенаправляем на /api
app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Server running in PORT ${PORT}`)
});