"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const proxy = require("http-proxy-middleware");
const config = require("./config.js");

const app = express();
app.use(morgan("tiny"));

// Proxy for client server
// Base on config file
if (config.proxy) {
  const paths = Object.keys(config.proxy);
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const option = config.proxy[path];
    app.use(proxy(path, option));
  }
}

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