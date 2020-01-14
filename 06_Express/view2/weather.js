const apiKey = '88563da110e6597271cee72100276d19';
const apiURI = 'http://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&unit=metric&appid=';

var request = require('request');
var weatherURI = apiURI + apiKey;
request(weatherURI, function(error, response, data)
{
    if(error)
    {
        throw error;
    }
    //console.log(response);
    //console.log(data);
    console.log(typeof data);

    var result = JSON.parse(data);

    let summary = `도시명: ${result.name}, 기온: ${result.main.temp} &deg; 체감: ${result.main.feels_like};`
    let icon = `<img src="http://api.openweathermap.org/img/w/${result.weather[0].icon}.png" height="50" width="100">`;
    console.log(summary);
    console.log(icon);
});