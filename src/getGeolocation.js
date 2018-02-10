'use strict';

export class GetGeolocation {
    constructor() {
        this.lat = 0;
        this.long = 0;

    }

    //Get Geolocation
    getGeolocation(){ 
        console.log(this.lat); 
        let options, geoloc, watchID;

        if(navigator.geolocation) {

            options = {timeout:60000};

            geoloc = navigator.geolocation;

            watchID = geoloc.watchPosition(this.weatherData,  this.errorCallback, options);
            

        } else {
            showError("Your browser does not support Geolocation!");
        }

       
    }

    //Getting weather data
   weatherData(position){
        let crd;
        crd = position.coords;
        this.lat  =  crd.latitude;
        this.long =  crd.longitude; 
        console.log(this.lat); 
    }

    //CallBack function if user block geolocation
   errorCallback(error) {
        if(error.code == error.PERMISSION_DENIED){
            alert('Sorry, You have to allow to share your geolcation or use search by City name');
        }
    }




}