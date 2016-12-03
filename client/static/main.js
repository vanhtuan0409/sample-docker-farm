$.get("/api/data", function(data, status) {
    const json = JSON.parse(data);
    const htmlString = json.map(item => "<li>"+ item +"</li>").join("");
    $("#app").html(htmlString)
})