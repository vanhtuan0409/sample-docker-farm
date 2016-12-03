const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: [
        path.join(__dirname, "src", "main.js"),
        path.join(__dirname, "src", "index.html")
    ],
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    output: {
        path: path.join(__dirname, "public"),
        filename: "main.js"
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'file?name=[name].[ext]',
        }],
    },
}