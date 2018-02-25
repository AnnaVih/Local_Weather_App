'use strict';

//Class for getting data by City name
class GetTimeOffsetsInRequestedCity {
    constructor(lat,long,timestamp) {
        this.apiKey    = "AIzaSyDXwAyBnaejuPPdBkm7qE5E5KjP8vhR6pM";
        this.lat       = lat;
        this.long      = long;
        this.timestamp = timestamp;
    }

     //Fetch time offsets response from Api
     async get() {
        const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.lat},${this.long}&timestamp=${this.timestamp}&key=${this.apiKey}`);

        const responseData = await response.json();

        return responseData;
    }
}

//Export classes
export { GetTimeOffsetsInRequestedCity }