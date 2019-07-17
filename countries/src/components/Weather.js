import React, { useState, useEffect } from 'react';
import axios from 'axios';

//const API_KEY = '';
// console.log(API_KEY);

const sampleData = {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 296.71,
    "pressure": 1013,
    "humidity": 53,
    "temp_min": 294.82,
    "temp_max": 298.71
  },
  "visibility": 16093,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
}

// console.log('sample data:', sampleData.weather[0].main); // Format: weather desc

// Note: requires API key. Put key in line 62 (let APIkey=...)
// Then, uncomment lines 66 - 81 to enable hook
const Weather = ({ capital, country }) => {
  // const [ weather, setWeather ] = useState(sampleData)
  const [ localWeather, setLocalWeather ] = useState({})
  let locationTemp = -10000;
  let locationWeatherDesc = '';
  let location = capital + ',' + country;
  console.log('location');
  let APIkey = '&APPID='.concat('');
  let weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='+location+APIkey;
  // console.log('Weather URL:', weatherURL);

  // useEffect(() => {
  //   if(window.confirm('Get data from openweathermap.org?')) {
  //     axios
  //       .get(weatherURL)
        
  //       .then(response => {
  //         console.log('Retreived weather data from openweather');
  //         console.log(response.data);
  //         setLocalWeather(response.data);
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //         console.log('Unable to fetch weather data');
  //       })
  //   }
  // }, []);

  const tempInCelsius = (tempInKelvin) => {
    if (tempInKelvin === -10000) {
      return null
    } else {
      const celsiusTemp = (tempInKelvin - 273.15).toFixed(1) + (' celsius');
      return celsiusTemp
    }
  }

  const getWeather = () => {
    if (localWeather !== {}) {
      let main = localWeather['main'];
      let weatherDesc = localWeather['weather'];
      // console.log("weather main:", weather["main"])
      
      if (main !== undefined) {
        let temp = main["temp"];
        // console.log(temp);
        locationTemp = temp;
      }

      if (weatherDesc !== undefined) {
        let localWeatherArray = weatherDesc[0];
        console.log('array:',localWeatherArray.description);
        locationWeatherDesc = localWeatherArray.description;
      }

      // console.log('localWeather:', localWeather["weather"]);

    }


    
    return (
      <>
        <p><strong>Temperature:</strong> {tempInCelsius(locationTemp)} </p> 
        <p><strong>Description: </strong>{locationWeatherDesc}</p>
      </>
    )
  }


  return (
    <div>
      <h3>Weather in {capital}</h3>
      {getWeather()}
    </div>
  )
}


export default Weather;