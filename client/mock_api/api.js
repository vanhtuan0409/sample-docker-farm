"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();
app.use(morgan("tiny"));

app.get("/data", (req, res) => {
    const filePath = path.join(__dirname, "data.json");
    const data = fs.readFileSync(filePath, "utf8");
    res.json(data);
});

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8000');
});