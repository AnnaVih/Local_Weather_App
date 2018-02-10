'use strict';

export class WeatherUI {
    constructor() {
        this.selectors = {
            cityName: document.querySelector('#cityName'),
            cityInput: document.querySelector('#city')
    };
}

    display(weather){
        this.selectors.cityInput.value = '';
        this.selectors.cityName.textContent = weather.name;
    }
}