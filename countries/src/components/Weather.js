import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const API_KEY = ;
// console.log(API_KEY);

const Weather = ({ capital, country }) => {
  const [weather, setWeather] = useState({})
  let location = capital + ',' + country;
  console.log('location');
  let APIkey = '';
  let weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='+location+APIkey;
  // console.log('Weather URL:', weatherURL);

  useEffect(() => {
    axios
      // .get(weatherURL)
      .then(response => {
        console.log('Retreived weather data from openweather');
        console.log(response.data);
        setWeather(response.data);
      })
      .catch(function(error) {
        console.log(error);
        console.log('Unable to fetch weather data');
      })
  }, []);

  const getWeather = () => {
    if (weather !== '') {
      console.log("weather main:", weather["main"])
      let main = weather['main'];
      if (main !== undefined) {
        let temp = main["temp"];
        console.log(temp);
      }
    }
  }


  return (
    <div>
      <h3>Weather in {capital}</h3>
      {getWeather()}
    </div>
  )
}


export default Weather;