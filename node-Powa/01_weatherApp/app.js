const request = require("request");

request({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+philadelhia&key=AIzaSyCEjV9McZkcUxvT8SWSyZfF7avggBVO_Zs",
    json: true
}, (error, response, body) => {
    console.log(`Dirección: ${body.results[0].formatted_address}`);
});