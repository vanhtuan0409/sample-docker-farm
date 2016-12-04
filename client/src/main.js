 const axios = require("axios");

axios.get("/api/data")
    .then(function (response) {
        const htmlString = response.data.map(item => "<li>"+item+"</li>").join("");
        document.getElementById("app").innerHTML = htmlString;
    })