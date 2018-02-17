'use strict';

//Importing classes
import { WeatherUI } from './weatherUI';

//Make instance of weatherUI
const newWeatherUI = new WeatherUI();

export class Geolocater {

    constructor() {
        //Check for browser support
        if ( this.isGeolocationAvailable() ) {
          //If it is support - create navigator
          this.navigator = navigator;
          //If no support display notice to user
        } else {
          return this.isGeolocationNotAvailable();
        }

      }

      //1.Checking for support 
      isGeolocationAvailable () {
        return 'geolocation' in navigator ? true : false;
      }

      //2.Notice user if browser does not support geolocation
      isGeolocationNotAvailable() {
         alert('Sorry, your browser does not support Geolococatio');
      }

      //3.Getting coordinats from navigator 
      getCurrentPosition() {
        //Return promise 
        return new Promise( ( resolve, reject) => {
          function positionSuccess(position) {
            resolve(position.coords);
          }
          function error() {
            reject( alert('Sorry, you did not allow to share your geolocation, try to use search BY city name'));
          }

          this.navigator.geolocation.getCurrentPosition(positionSuccess, error, { enableHighAccuracy: true });
        });

      }
}