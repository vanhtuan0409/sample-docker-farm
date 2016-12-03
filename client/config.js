const config = process.env.NODE_ENV === "production" ?
    require("./config.prod.js") :
    require("./config.dev.js");
module.exports = config;