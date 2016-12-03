const config = require("../config.js");
const axios = require("axios");

axios.get("http://localhost:8080/data")
    .then(function (response) {
        const json = JSON.parse(response.data);
        const htmlString = json.map(item => "<li>"+item+"</li>").join("");
        document.getElementById("app").innerHTML = htmlString;
    })