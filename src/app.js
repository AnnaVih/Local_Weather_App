'use strict';

//Importing classes
import { WeatherUI } from './weatherUI';

import { GetGeolocation } from './getGeolocation';

import { GetWeatherByLocation } from './weatherDataByGeolocation';

import { GetWeatherByCityName } from './weatherDataByCityName'; 




//Make instance of weatherUI
const newUI = new WeatherUI();

const geolocation = new GetGeolocation();


const  getByLoc = () => {
    
    // console.log(geolocation);
    const p = geolocation.getGeolocation();
   
    
     //Make instance of GetWeatherByLocation
    const weatherDataByLocation = new GetWeatherByLocation(geolocation.lat, geolocation.long);

    //Getting data from Api server by geolocation
    weatherDataByLocation.get().then(results => {
        newUI.display(results);
    })
    .catch(err => console.log(err));
}




//Getting data from Api server by city name
const getWeatherByCity = () => {
    let weatherByCityName, cityName;

    cityName = document.querySelector('#city').value;

    weatherByCityName = new GetWeatherByCityName(cityName);

    weatherByCityName.get().then(results => {
        console.log(results);
        newUI.display(results);
    }) 
    .catch(err => console.log(err));
}

document.getElementById('geolocation').addEventListener('click', getByLoc);

document.getElementById('search').addEventListener('click', getWeatherByCity);












