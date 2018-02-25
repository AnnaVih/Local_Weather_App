'use strict';

//Class for getting data by City name
class GetWeatherByCityName {
    constructor(city) {
        this.apiKey = config.MY_WEATHER_KEY;
        this.city = city;
    }

     //Fetch weather from Api
     async get() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);

        const responseData = await response.json();

        return responseData;
    }
}

//Export classes
export { GetWeatherByCityName }