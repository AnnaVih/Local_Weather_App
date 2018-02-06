class GetWeather {
    constructor(lon, lat) {
        this.apiKey = "899a19ddf646d47b";
        this.longtitudeOrState = lon || state;
        this.latitudeOrCity = lat || city;
    }
    //Fetch weather from Api

    async get() {
        const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.longtitudeOrState}/${this.latitudeOrCity}.json`);
        const responseData = await response.json();

        return responseData.current_observation;
    }
}

export const weatherData = new GetWeather();