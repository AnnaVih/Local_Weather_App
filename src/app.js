'use strict';

//Importing classes
import { WeatherUI } from './weatherUI';

import { Geolocater } from './getGeolocation';

import { GetWeatherByLocation } from './weatherDataByGeolocation';

import { GetWeatherByCityName } from './weatherDataByCityName'; 


//Make instance of weatherUI
const newWeatherUI = new WeatherUI();


//Getting data from Api server by location
const  getWeatherByLocation = () => {
   
    //Make instance of GetWeatherByLocation
   const geolocator = new Geolocater();

   //Call watchPosition methods,
   //recieve coordinates and pass them
   //to new created instance of GetWeatherByLocation Class
   geolocator.watchPosition().then( ( coordinates ) => {

   const weatherDataByLocation = new  GetWeatherByLocation(coordinates.latitude, coordinates.longitude);

   //Getting data from Api server by geolocation and display on UI
   weatherDataByLocation.get()
                        .then(results => {console.log(results);newWeatherUI.display(results)})
                        .catch(err => console.log(err));
   });
}



//Getting data from Api server by city name
const getWeatherByCity = () => {
   let cityName, selectors;

   selectors = newWeatherUI.selectors;

   //Get input value from user
   cityName = selectors.cityInput.value;

   //Make new instance and pass value
   const weatherByCityName = new GetWeatherByCityName(cityName);

   //Recieve data and display it on UI
   weatherByCityName.get().then(results => {
       console.log(results);
       newWeatherUI.display(results);
   }) 
   .catch(err => console.log(err));
}


//On click Event listeners
document.getElementById('geolocation').addEventListener('click', getWeatherByLocation);

document.getElementById('search').addEventListener('click', getWeatherByCity);

document.addEventListener('keypress',  function(event) {
    if(event.keyCode === 13 || event.which === 13) {
        getWeatherByCity();
    }
});





