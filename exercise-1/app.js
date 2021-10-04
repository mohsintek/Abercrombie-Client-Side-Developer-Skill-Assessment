const express = require("express");
const app = express();
const path = require("path");

const Port = 3000;

const staticPath = path.join(__dirname, "../exercise-1/public")

app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.send("exercise-1")
})

app.listen(Port, (req, res) => {
    console.log(`listening the port at ${Port}`)
})