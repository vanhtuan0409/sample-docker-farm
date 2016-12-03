const devConfig = {
    API_URL: "http://localhost:8081"
}
const prodConfig = {
    API_URL: "http://localhost:8080"
}
module.exports = process.env.NODE_ENV === "production" ? prodConfig : devConfig;