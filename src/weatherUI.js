'use strict';

export class WeatherUI {
    constructor() {
        this.selectors = {
            cityName: document.querySelector('#cityName'),
            cityInput: document.querySelector('#city'),
            temperature: document.querySelector('#temperature'),
            units: document.querySelector('#units'),
            radioButton: document.querySelector('#celcius')
        }
        this.temp = '';
    }


    /**************** METHODS **********************/

    ifNotSupportedByBrowser() {
        // Notify user
    }

    //Display weather 
    display(weather){
        //Save temperature state in Celcius
        this.temp = Math.round(weather.main.temp);

        //Clear input field 
        this.selectors.cityInput.value = '';

        this.selectors.radioButton.checked = true;

        //Display data on UI
        this.selectors.cityName.textContent = weather.name;
        this.selectors.temperature.textContent = Math.round(weather.main.temp) + " \xB0C";  

        //Display temperature units options
        this.selectors.units.style.display = 'block';

    }

    // Switch from Celcius to Fahrenheit
    fromCelsiusToFahrenheit(){
        //Basic algorithm to convert from Celcius to Fahrenheit
        const cToFahr = Math.round(this.temp * 9 / 5 + 32);

        //Display temperature in Fahrenheit
        const message = `${cToFahr} \xB0F.`;
        this.selectors.temperature.textContent = message;

        //Change state of temperature
        this.temp = cToFahr;
    }

    // Switch from Fahrenheit to Celcius
    fromFahrenheitToCelsius(){
         //Basic algorithm to convert from Fahrenheit to Celcius
        const fToCel = Math.round((this.temp - 32) * 5 / 9);

        //Display temperature in Celcius
        const message = `${fToCel} \xB0C.`;
        this.selectors.temperature.textContent = message;

        //Reset state of temperature
        this.temp = fToCel;
      }  
}