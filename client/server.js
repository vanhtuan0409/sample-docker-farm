"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");

const publicPath = path.join(__dirname, "public");
const app = express();
app.use(morgan("tiny"));

if (process.env.NODE_ENV !== "production") {
    const webpack = require("webpack");
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const wpConfig = require("./webpack.config.dev.js");

    const compiler = webpack(wpConfig);
    const middleware = webpackMiddleware(compiler, {
        publicPath: wpConfig.output.publicPath,
        noInfo: true,
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('/', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(publicPath));
        res.end();
    });
} else {
    app.use(express.static(publicPath));
}

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${port}`);
});