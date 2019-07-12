import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const API_KEY = ;
// console.log(API_KEY);

const Weather = ({ capital, country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get('api.openweathermap.org/data/2.5/weather?q='+capital+','+country)
      .then(response => {
        console.log('Retreived weather data for',capital,country);
        setWeather(response.data)
      })
  })


  return (
    <div>
      <h3>Weather in {capital}</h3>
    </div>
  )
}


export default Weather;