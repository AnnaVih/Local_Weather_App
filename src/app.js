'use strict';

//Importing classes
import { WeatherUI } from './weatherUI';

import { Geolocater } from './getGeolocation';

import { GetWeatherByLocation } from './weatherDataByGeolocation';

import { GetWeatherByCityName } from './weatherDataByCityName'; 

import { GetTimeOffsetsInRequestedCity } from './localTimeOffsetsInRequestedCity';


//Make instance of weatherUI class
const newWeatherUI = new WeatherUI();



/***************  GETTING WEATHER DATA ************************
 *************************************************************/


/********** 1. Getting data from Api server by CURRENT LOCATION *********/

function getWeatherByLocation() {

    //1. Make instance of GetWeatherByLocation
    const geolocator = new Geolocater();

     //2. Call getCurrentPosition methods, recieve coordinates
    geolocator.getCurrentPosition().then(function( coordinates ) {

        //3. Pass coordinates to new created instance of GetWeatherByLocation Class
        const weatherDataByLocation = new  GetWeatherByLocation(coordinates.latitude, coordinates.longitude);

        //4. Getting data from Api server by geolocation and display on UI
        weatherDataByLocation.get()
                            .then(extractWeatherData)
                            //4.1 Catch error in case if no weather data recieved
                            .catch(function extractWeatherDataErr(err) {
                                newWeatherUI.alertMessage('Please, check your internet connection or reload page', 'alert-message')
                            });
    });
}



/************** 2.Getting data from Api server by CITY NAME **********/

function getWeatherByCity() {

    //1.Get city name from user
    const cityName = newWeatherUI.cityInput.value;

    //2.If city name value is true continue
    if(cityName) {

    //3.Make new instance and pass values
    const weatherByCityName = new GetWeatherByCityName(cityName);

    //4.Recieve data and display it on UI
    weatherByCityName.get()
                     .then(extractWeatherData) 
                     .catch(function extractWeatherDataErr(err) {
                        newWeatherUI.alertMessage('Please, enter correct city', 'alert-message');
                        console.log(err);
                    });
    }        
}


// Reusable function for extracting data from api

function extractWeatherData(resultsWeather){
                   
    //1. Get latitude, longitude and timeStamp
    newWeatherUI.getResponseValueFromWeather(resultsWeather);

    //2. Pass them into new instanse of GetTimeOffsetsInRequestedCity for getting zone offsets
    const localTimeOffSets = new GetTimeOffsetsInRequestedCity(newWeatherUI.latitude, newWeatherUI.longitude, newWeatherUI.timeStamp);

    //3. Get zone offsets results from promise
    localTimeOffSets.get()
                    .then(function extractZoneOffsetsData(resultsZoneOffSets){

                    //3.1 Set local time 
                    newWeatherUI.getLocalTimeInRequestedCity(resultsZoneOffSets);

                    //3.2 Set local sunRise and sunSet times
                    newWeatherUI.setSunSetAndSunriseTime(resultsZoneOffSets);

                    //3.2 Display all content on UI
                    newWeatherUI.display(resultsWeather);

                    //3.3 Toggle active class on click of units type
                    newWeatherUI.unitsType.forEach(unit => unit.addEventListener('click', switchBetweenUnits));
                })

                //4. Catch error in case if no time data recieved
                .catch(function extractZoneOffsetsData(err){
                    console.log(err);
                }); 
}


/******************** Switch temperature Between ******************************
 * ************Metric(Celcius) and Imperial(Fahrenheit) units and vice versa **************************/

function switchBetweenUnits() {
    //Check if this units not active
    if( !(this.classList.contains('active')) && this.id === 'fahrenheit' ){

        newWeatherUI.fromCelsiusToFahrenheit();

    }else if( !(this.classList.contains('active')) && this.id === 'celcius' ){

        newWeatherUI.fromFahrenheitToCelsius();

    }else {

        return;
    }
}


//Set background image and depend on time of day change it
function setBackgroundImage() {

    newWeatherUI.addBackgroundImage();
}



/******************  EVENT LISTENERS  ***********************
 ***********************************************************/

//On click Event listeners

document.getElementById('my-geolocation-btn').addEventListener('click', getWeatherByLocation);

document.getElementById('search-btn').addEventListener('click', getWeatherByCity);

document.addEventListener('keypress',  function(event) {
    if(event.keyCode === 13 || event.which === 13) {
        getWeatherByCity();
    }
});










