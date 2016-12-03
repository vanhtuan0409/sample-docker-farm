"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV !== "production") {
    console.log("Dev enviroment => disable email");
}

app.get("/data", (req, res) => {
    const filePath = path.join(__dirname, "data.json");
    const data = fs.readFileSync(filePath, "utf8");
    res.json(data);
});
const port = process.env.PORT || 8080;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://localhost:${port}`);
});