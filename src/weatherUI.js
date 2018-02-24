'use strict';

export class WeatherUI {
    constructor() {
                this.html       = document.querySelector('html');
                this.dinamicDiv = document.querySelector('#dinamic-content');
                this.cityInput  = document.querySelector('#search-city');
                this.temp;  
                this.cityName;
                this.temperature;
                this.unitsType;
                this.celcius;
                this.fahrenheit; 
                this.sunRise;
                this.sunSet;       
    }


    /**************** METHODS **********************/

    alertMessage(msg, className) {
        //Clear alert in case if any
        this.clearAlert();

        //Create div
        const div = document.createElement('div');

        //Add class
        div.className = className;

        //Create text node
        const textNode = document.createTextNode(msg);

        //Apend to parent div
        div.appendChild(textNode);

        const alert = document.querySelector('#alert');

        alert.appendChild(div);

        //3.Remove it after 4 sec
        setTimeout(() => {
            this.clearAlert();
        }, 4000);
    }


    clearAlert(){
        const currentAlert = document.querySelector('.alert-message');
        if(currentAlert){
            currentAlert.remove();
        }
    }


    display(weather) {
        //1.Get document element once and use its constant(Do't get it every time)
        const documentEl = document;
        let dinamicContent;

        //2.Save temperature state in Celcius
        this.temp = Math.round(weather.main.temp);

        //3.Getting sun set and sun rise times
        const sunSetSunRise = this.sunSetAndSunriseTime(weather.sys.sunrise,weather.sys.sunset);

        //4.Set sunRise and sunSet time
        this.sunRise = sunSetSunRise.sunR;
        this.sunSet = sunSetSunRise.sunS;

        this.addBackgroundImage();

        //5.Make html snippet with dinamic content recived from Api
        dinamicContent = `
            <div class="row mt-4">
                <div class="col-md-12">
                    <h3 class="freeCodeCamp-app text-left">${weather.name}, ${weather.sys.country}</h3>
                    <p>${this.getDayAndTime().day}, ${this.getDayAndTime().hour}.</p>
                </div>
                <div class="col-md-5">
                    <img src="https://openweathermap.org/img/w/${weather.weather[0].icon}.png" class="weather-icon">
                    <div id="units">
                            <span id="temperature">${this.temp}</span> 
                            <span id="celcius" class="active units-type">&#8451;</span> | <span id="fahrenheit" class="units-type"> &#8457;</span>
                            <p class="weather-description">${weather.weather[0].description}</p>
                    </div>
                </div>  
                <div class="col-6 col-md-4 forecast">
                    <p><span class="weather-forecast">Main:   </span>${weather.weather[0].main}</p>
                    <p><span class="weather-forecast">Pressure:</span> ${weather.main.pressure} hPa</p>
                    <p><span class="weather-forecast">Humidity:</span> ${weather.main.humidity}%</p>
                </div>
                <div class="col-6 col-md-3">
                    <p><span class="weather-forecast">Wind:</span> ${weather.wind.speed}mph</p>
                    <p><span class="weather-forecast">Sunrise:</span> ${this.sunRise}</p>
                    <p><span class="weather-forecast">Sunset:</span> ${this.sunSet}</p>
                </div>
            </div>`;

        //6.Pass dinamic snippet into created div
        this.dinamicDiv.innerHTML = dinamicContent;

        //7.Get selectors and attach them to this constructor class for future usage
        this.cityName    = documentEl.querySelector('#cityName');
        this.temperature = documentEl.querySelector('#temperature');
        this.unitsType   = documentEl.querySelectorAll('.units-type');
        this.celcius     = documentEl.querySelector('#celcius');
        this.fahrenheit  = documentEl.querySelector('#fahrenheit');

        //8.Clear input field 
        this.cityInput.value = '';
    }


    fromCelsiusToFahrenheit(){
        //1.Remove active class from fahrenheit and add to celcius
        this.toggleClassess(this.celcius, this.fahrenheit);

        //2.Basic algorithm to convert from Celcius to Fahrenheit
        const cToFahr = Math.round(this.temp * 9 / 5 + 32);

        //3.Display temperature in Fahrenheit
        this.temperature.textContent = cToFahr;

        //4.Change state of temperature
        this.temp = cToFahr;
    }


    fromFahrenheitToCelsius(){
        //1.Remove active class from celcius and add to fahrenheit
        this.toggleClassess(this.fahrenheit, this.celcius);

        //2.Basic algorithm to convert from Fahrenheit to Celcius
        const fToCel = Math.round((this.temp - 32) * 5 / 9);

        //3.Display temperature in Celcius
        this.temperature.textContent = fToCel;

        //4.Reset state of temperature
        this.temp = fToCel;
    }  


    toggleClassess(firstClassName, secondClassName){
        //Check for active class and toogle on click
        if(firstClassName.classList.contains('active')){
           firstClassName.classList.remove('active');
           secondClassName.classList.add('active');
        }
    }


    getDayAndTime() {
        //Get dste and display day of week
        const date = new Date();
        const hours =  date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", 
        "Thursday", "Friday", "Saturday"];

        //Return current day and hours
        return {
            day: dayNames[date.getDay()],
            hour: `${hours}:00` 
        }
    }


    sunSetAndSunriseTime(sunRise, sunSet) {
        //Getting time by sunrise and sunset utc code
        const sunR = this.convertTimeFromUTC(sunRise);
        const sunS  = this.convertTimeFromUTC(sunSet);

        //Return sun rise and sun set times
        return {
            sunR: sunR.time,
            sunS: sunS.time
        }
    }

    convertTimeFromUTC(utc){
        const  date = new Date(utc * 1000);

        //Check for hour and minute in case if less than 10 add 0 before
        const  hour =  date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const  min  =  date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        //Concat hours and minutes
        const  time = `${hour}:${min}`;

        return {
            time
        }
    }


    addBackgroundImage() {
        //1.Get current date
        const date = new Date();
        //2.Get current time
        const time = `${date.getHours()}:${date.getMinutes()}`;

        //Check for current time if it between sun rise and sun set make dinamic background image
        time > this.sunRise && time < this.sunSet 
                                                ? this.html.style.background = 'url("images/day.jpg")'
                                                : this.html.style.background = 'url("images/night.jpg")';  
    }

}