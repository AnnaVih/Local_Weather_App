'use strict';

//Importing classes
import { WeatherUI } from './weatherUI';

import { Geolocater } from './getGeolocation';

import { GetWeatherByLocation } from './weatherDataByGeolocation';

import { GetWeatherByCityName } from './weatherDataByCityName'; 


//Make instance of weatherUI class
const newWeatherUI = new WeatherUI();

//Getting document selectors
const documentSelectors = newWeatherUI.selectors;



/***************  GETTING WEATHER DATA ************************
 *************************************************************/

/********** Getting data from Api server by CURRENT LOCATION *********/

function getWeatherByLocation() {

   //Make instance of GetWeatherByLocation
   const geolocator = new Geolocater();
   
   //Call getCurrentPosition methods,
   //recieve coordinates and pass them
   //to new created instance of GetWeatherByLocation Class
   geolocator.getCurrentPosition().then(function( coordinates ) {

   const weatherDataByLocation = new  GetWeatherByLocation(coordinates.latitude, coordinates.longitude);

   //Getting data from Api server by geolocation and display on UI
   weatherDataByLocation.get()
                        .then(function(results){
                            // console.log(results);
                            newWeatherUI.display(results)})

                        .catch(function(err){
                            console.log(err);
                        });
    });
}




/************** Getting data from Api server by CITY NAME **********/

function getWeatherByCity() {

   //Get city name from user
   const cityName = documentSelectors.cityInput.value;

   //Make new instance and pass values
   const weatherByCityName = new GetWeatherByCityName(cityName);

   //Recieve data and display it on UI
   weatherByCityName.get()
                    .then(function(results){
                    // console.log(results);
                    newWeatherUI.display(results);
                    }) 
                    .catch(function(err){
                        console.log(err);
                    });                  
}



/******** Switch temperature Between Celcius and Fahrenheit and vice versa ***/

function switchBetweenUnits() {
   //Check if this units not active
   if( !(this.classList.contains('active')) && this.id === 'fahrenheit' ){
      //Call 
      newWeatherUI.fromCelsiusToFahrenheit();

   }else if( !(this.classList.contains('active')) && this.id === 'celcius' ){

    newWeatherUI.fromFahrenheitToCelsius();

   }else {
       return;
   }
}



/******************  EVENT LISTENERS  ***********************
 ***********************************************************/



//On click Event listeners

document.getElementById('geolocation').addEventListener('click', getWeatherByLocation);

document.getElementById('search').addEventListener('click', getWeatherByCity);

document.addEventListener('keypress',  function(event) {
    if(event.keyCode === 13 || event.which === 13) {
        getWeatherByCity();
    }
});

document.querySelectorAll('.units').forEach(unit => unit.addEventListener('click', switchBetweenUnits));




