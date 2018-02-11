'use strict';

export class WeatherUI {
    constructor() {
        this.selectors = {
            cityName: document.querySelector('#cityName'),
            cityInput: document.querySelector('#city'),
            temperature: document.querySelector('#temperature'),
    };
}

    display(weather){
        this.selectors.cityInput.value = '';
        this.selectors.cityName.textContent = weather.name;
        this.selectors.temperature.textContent = Math.round(weather.main.temp) + " \xB0C";
    }

    ifNotSupportedByBrowser() {
        
    }

    fromCelsiusToFahrenheit(weather){
        
    }
}