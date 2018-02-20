'use strict';

//Importing classes
import { WeatherUI } from './weatherUI';

//Make instance of weatherUI
const newWeatherUI = new WeatherUI();

export class Geolocater {

    constructor() {
        //Check for browser support
        if ( this.geolocationIsAvailable() ) {
          //If it is support - create navigator
          this.navigator = navigator;
          //If no support display notice to user
        } else {
          return this.geolocationIsNotAvailable();
        }

      }

      //Check for geolocation
      geolocationIsAvailable () {
        return 'geolocation' in navigator ? true : false;
      }



      //Alert user if browser does not support geolocation
      geolocationIsNotAvailable() {
        newWeatherUI.alertMessage('Sorry, your browser does not support Geolocation', 'alert-message');
      }


      //Getting coordinats from navigator 
      getCurrentPosition() {
        //Return promise 
        return new Promise( ( resolve, reject ) => {
          function positionSuccess( position ) {
            resolve( position.coords );
          }
          function error() {
            reject( newWeatherUI.alertMessage('Sorry, you did not allow to share your geolocation. Try to search by city', 'alert-message'));
          }

          this.navigator.geolocation.getCurrentPosition(positionSuccess, error, { enableHighAccuracy: true });
        });

      }
}