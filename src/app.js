//Importing classes
import { GetWeatherByLocation, GetWeatherByCity } from './weatherData';

//Make 
const getLocation = () => { 
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(weatherData, errorCallback);
    } else {
        showError("Your browser does not support Geolocation!");
    }
}

//Getting weather data
const weatherData = position => {
        let lat, long, weatherDataByLocation;

        /*Getting latitude and longitude from
        user location*/

        lat = position.coords.latitude;
        long = position.coords.longitude;

        //Make instance of Class and pass latitude and longitude
        weatherDataByLocation = new GetWeatherByLocation(lat, long);

        //Getting data from Api server
        weatherDataByLocation.get().then(results => {
            console.log(results);
        })
        .catch(err => console.log(err));
}

//CallBack function in case if user block geolocation
const errorCallback = error => {
    if(error.code == error.PERMISSION_DENIED){
        console.log('enter your city');
    }
}

console.log(getLocation());

