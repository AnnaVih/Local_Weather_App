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

/********** Getting data from Api server by CURRENT LOCATION *********/

function getWeatherByLocation() {

    //1. Make instance of GetWeatherByLocation
    const geolocator = new Geolocater();

     //2. Call getCurrentPosition methods, recieve coordinates
    geolocator.getCurrentPosition().then(function( coordinates ) {

        //3. Pass coordinates to new created instance of GetWeatherByLocation Class
        const weatherDataByLocation = new  GetWeatherByLocation(coordinates.latitude, coordinates.longitude);

        //4. Getting data from Api server by geolocation and display on UI
        weatherDataByLocation.get()
                            .then(function extractWeatherData(resultsWeather){
                                    
                                    //4.1 Get latitude, longitude and timeStamp
                                    newWeatherUI.getResponseValueFromWeather(resultsWeather);

                                    //4.2 Pass them into new instanse of GetTimeOffsetsInRequestedCity for getting zone offsets
                                    const localTimeOffSets = new GetTimeOffsetsInRequestedCity(newWeatherUI.latitude, newWeatherUI.longitude, newWeatherUI.timeStamp);

                                    //4.3 Get zone offsets results from promise
                                    localTimeOffSets.get()
                                                    .then(function extractZoneOffsetsData(resultsZone){

                                                    //4.4 Set local time 
                                                    newWeatherUI.getLocalTimeInRequestedCity(resultsZone);

                                                    //4.5 Display all content on UI
                                                    newWeatherUI.display(resultsWeather);

                                                    //4.6 Toggle active class on click of units type
                                                    newWeatherUI.unitsType.forEach(unit => unit.addEventListener('click', switchBetweenUnits));
                                                })

                                                //Catch error in case if no time data recieved
                                                .catch(function extractZoneOffsetsData(err){
                                                console.log(err);
                                                }); 
                            })
                            //Catch error in case if no weather data recieved
                            .catch(function extractWeatherData(err){
                                newWeatherUI.alertMessage('Please, check your internet connection or reload page', 'alert-message');
                                console.log(err);
                            });
    });
}



/************** Getting data from Api server by CITY NAME **********/

function getWeatherByCity() {

    //1.Get city name from user
    const cityName = newWeatherUI.cityInput.value;

    //2.If city name value is true continue
    if(cityName){

    //3.Make new instance and pass values
    const weatherByCityName = new GetWeatherByCityName(cityName);

    //4.Recieve data and display it on UI
    weatherByCityName.get()
                    .then(function extractWeatherData(resultsWeather){

                            //4.1 Get latitude, longitude and timeStamp
                            newWeatherUI.getResponseValueFromWeather(resultsWeather);

                            //4.2 Pass them into new instanse of GetTimeOffsetsInRequestedCity for getting zone offsets
                            const localTimeOffSets = new GetTimeOffsetsInRequestedCity(newWeatherUI.latitude, newWeatherUI.longitude, newWeatherUI.timeStamp);

                            //4.3 Get zone offsets results from promise
                            localTimeOffSets.get()
                                            .then(function extractZoneOffsetsData(resultsZoneOffSets){

                                                //4.4 Set local time 
                                                newWeatherUI.getLocalTimeInRequestedCity(resultsZoneOffSets);

                                                //4.5 Display all content on UI
                                                newWeatherUI.display(resultsWeather);

                                                //4.6 Toggle active class on click of units type
                                                newWeatherUI.unitsType.forEach(unit => unit.addEventListener('click', switchBetweenUnits));
                                            })

                                            //Catch error in case if no time data recieved
                                            .catch(function extractZoneOffsetsData(err){
                                                newWeatherUI.alertMessage('Please, enter correct city', 'alert-message');
                                                console.log(err);
                                            }); 

                    //Catch error in case if no weather data recieved
                    }) 
                    .catch(function extractWeatherData(err){
                        console.log(err);
                        newWeatherUI.alertMessage('Please, enter correct city', 'alert-message');
                    });  

    }        
}



// Switch temperature Between Celcius and Fahrenheit and vice versa
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










