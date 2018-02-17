'use strict';

export class WeatherUI {
    constructor() {
        this.selectors = {
            cityName: document.querySelector('#cityName'),
            cityInput: document.querySelector('#city'),
            temperature: document.querySelector('#temperature'),
            units: document.querySelector('#units'),
            celcius: document.querySelector('#celcius'),
            fahrenheit: document.querySelector('#fahrenheit')
        }
        this.temp = '';
    }


    /**************** METHODS **********************/

    ifNotSupportedByBrowser() {
        // Notify user
    }

    //Display weather 
    display(weather){
        this.selectors.celcius.classList.add('active');
        
        this.toggleClassess(this.selectors.fahrenheit, this.selectors.celcius);
       
        //Save temperature state in Celcius
        this.temp = Math.round(weather.main.temp);

        //Clear input field 
        this.selectors.cityInput.value = '';

        //Display data on UI
        this.selectors.cityName.textContent = weather.name;
        this.selectors.temperature.textContent = Math.round(weather.main.temp);  

        //Display temperature units options
        this.selectors.units.style.display = 'block';

    }

   
    fromCelsiusToFahrenheit(){
        
        //Remove active class from fahrenheit and add to celcius
        this.toggleClassess(this.selectors.celcius, this.selectors.fahrenheit);

        //Basic algorithm to convert from Celcius to Fahrenheit
        const cToFahr = Math.round(this.temp * 9 / 5 + 32);

        //Display temperature in Fahrenheit
        this.selectors.temperature.textContent = cToFahr;

        //Change state of temperature
        this.temp = cToFahr;
    }


    
    fromFahrenheitToCelsius(){
        //Remove active class from celcius and add to fahrenheit
        this.toggleClassess(this.selectors.fahrenheit, this.selectors.celcius);

        //Basic algorithm to convert from Fahrenheit to Celcius
        const fToCel = Math.round((this.temp - 32) * 5 / 9);

        //Display temperature in Celcius
        this.selectors.temperature.textContent = fToCel;

        //Reset state of temperature
        this.temp = fToCel;
      }  

    //Toggle active class 
    toggleClassess(firstClassName, secondClassName){
        if(firstClassName.classList.contains('active')){
           firstClassName.classList.remove('active');
           secondClassName.classList.add('active');
        }
    }
}