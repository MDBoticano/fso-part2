import React from 'react';
import './Country.css';

const Country = ({ country, showDetails }) => {

  const mapLanguages = () => {
    console.log(country.languages);
    return (country.languages).map(language => 
    <li key={language.name}>{language.name}</li>)
  }

  const displayCountry = () => {
    if (showDetails) {
      return (
        <div>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h2>Languages</h2>
          <ul>
            {mapLanguages()}
          </ul>
          <img class="flag-img" src={country.flag} alt={country.name+'_flag'}/>
        </div>
      )
    } else {
      return (
        <div>
          <h2>{country.name}</h2>
        </div>
      )
    }
  }
  
  return (
    <div> 
      {displayCountry()} 
    </div>    
  )
 
}

export default Country