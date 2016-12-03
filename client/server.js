"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const proxy = require("http-proxy-middleware");
const wpConfig = require("./webpack.config.js");

const app = express();
app.use(morgan("tiny"));

app.use("/static", express.static(path.join(__dirname, "static")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});