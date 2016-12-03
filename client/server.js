"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const proxy = require('http-proxy-middleware');
const config = require('./config.js');

const app = express();
app.use(morgan("tiny"));
app.use('/api', proxy({
    target: config.API_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/api': '' 
    },
}))

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
    const bundlePath = path.join(__dirname, "public/index.html");
    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(bundlePath));
        res.end();
    });
} else {
    app.use(express.static(path.join(__dirname, "public")));
}

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${port}`);
});