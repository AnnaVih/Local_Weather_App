//Class for getting data by user geolocation
class GetWeatherByLocation {
    constructor(latitudeOrCity, longtitudeOrState) {
        this.apiKey = "edaef03bbd44981db95e799ae52c9ce0";
        this.latitudeOrCity = latitudeOrCity;
        this.longtitudeOrState = longtitudeOrState;
    }

     //Fetch weather from Api
     async get() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitudeOrCity}&lon=${this.longtitudeOrState}&appid=${this.apiKey}`);

        const responseData = await response.json();

        return responseData;
    }
}

//Class for getting data by City name
class GetWeatherByCity {
    constructor(city) {
        this.apiKey = "edaef03bbd44981db95e799ae52c9ce0";
        this.city = city;
    }

     //Fetch weather from Api
     async get() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`);

        const responseData = await response.json();

        return responseData;
    }
}

//Export classes
export {GetWeatherByLocation, GetWeatherByCity }