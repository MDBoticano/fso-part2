import React, { useState, useEffect } from 'react'
import Country from './Country'

import axios from 'axios';

const Countries = ({ nameFilter }) => {
  const [countries, setCountries] = useState([])

  /* Fetches countries data once */
  useEffect(()=> {
    if (nameFilter === '') {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        // .get('https://restcountries.eu/rest/v2/all?fields=name')
        .then(response => {
          console.log('Retrieved all RESTcountries');
          console.log(response.data);
          setCountries(response.data);
        })
    } else {
      axios
      .get('https://restcountries.eu/rest/v2/name/'+nameFilter)
      .then(response => {
        console.log('Retrieved RESTcountries');
        console.log(response.data);
        setCountries(response.data);
      })
    }
  }, [nameFilter])
  
  const filterCountries = (array) => {
    const caseInsensitive = nameFilter.toLowerCase();
    return array.filter(country => 
      country.name.toLowerCase().includes(caseInsensitive))
  }

  const countriesToDisplay = filterCountries(countries);
  
  const countriesNameOnly = () => {
    console.log("Running countriesNameOnly");
    console.log(countriesToDisplay);
    
    const filteredCountries =  countriesToDisplay.map(country => 
      <Country key={country.name} country={country} showDetails={false}/>
    )
    console.log(filteredCountries);
    return (filteredCountries)
  }

  const countryDetailed = () => {
    console.log("Running countryDetailed");
    console.log(countriesToDisplay);
    return <Country country={countriesToDisplay[0]} showDetails={true} />
  }

  const displayCountries = () => {
    console.log('# of matches:', countries.length);
    const numCountries = countries.length
    if (numCountries > 10) {
      console.log("Specify");
      return <p>Too many matches, specify filter</p>
    } else if (numCountries > 1 && numCountries <= 10) {
      console.log("Names only");
      return countriesNameOnly();
    } else if (numCountries === 1) {
      console.log("Details");
      return countryDetailed();
    }
  }
  
  return (
    <div>
      {displayCountries()}
    </div>
  )
}

export default Countries