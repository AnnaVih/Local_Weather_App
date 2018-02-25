'use strict';

//Class for getting data by user geolocation
class GetWeatherByLocation {
    constructor(latitude, longtitude) {
        this.apiKey = config.MY_WEATHER_KEY;
        this.latitude = latitude;
        this.longtitude = longtitude;
    }

     //Fetch weather from Api
     async get() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longtitude}&appid=${this.apiKey}&units=metric`);

        const responseData = await response.json();

        return responseData;
    }
}


//Export classes
export { GetWeatherByLocation }