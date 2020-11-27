const express = require("express");
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config();

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan("dev"));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.send("Hello, World 👋");
})
app.get("/home", (req, res) => {
    res.sendFile(__dirname+"/public/pages/index.html");
})
app.use("/api/v1/weather", require('./routes/api/weather'));
app.use("/api/v1/photo", require('./routes/api/photo'));



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));