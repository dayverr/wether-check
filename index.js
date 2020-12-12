const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
});


app.post('/', function(req, res){

    const cityName = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=2325b48458223ade7403bf288be7ee94&units=metric";

https.get(url, function(response){
    response.on("data", function(data){
        const wetherData = JSON.parse(data);
        var temp = wetherData.main.temp;
        var wetherDetails = wetherData.weather[0].description;
        const icon = wetherData.weather[0].icon
        res.write(`<h1>Temp in ${cityName} is ${temp} celsium and wether is  "${wetherDetails}"</h1>`);
        res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>`)
        res.send();
    })
})
})




app.listen(3000, function(){
    console.log ("server started on port 3000 MV");
});