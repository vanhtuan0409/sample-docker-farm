 const axios = require("axios");

axios.get("/api/data")
    .then(function (response) {
        const data = JSON.parse(response.data);
        const htmlString = data.map(item => "<li>"+item+"</li>").join("");
        document.getElementById("app").innerHTML = htmlString;
    })