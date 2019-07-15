import React, { useState } from 'react';
import './Country.css';
import Weather from './Weather';

const Country = ({ country, showDetails }) => {
  const [detailsToggle, setDetailsToggle] = useState(showDetails);

  const mapLanguages = () => {
    // console.log(country.languages);
    return (country.languages).map(language => 
    <li key={language.name}>{language.name}</li>)
  }

  const toggleDetails = () => setDetailsToggle(!detailsToggle);

  const toggleText = () => { 
    if (detailsToggle) { return 'hide details' } 
    else { return 'show details' }
  }

  const displayCountry = () => {
    if (detailsToggle) {
      return (
        <div>
          <h2>{country.name}</h2>
          <button onClick={toggleDetails}>{toggleText()}</button>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h3>Languages</h3>
          <ul>
            {mapLanguages()}
          </ul>
          <img className="flag" src={country.flag} alt={country.name+'_flag'}/>
          <Weather country={country.alpha2Code} capital={country.capital} />
        </div>
      )
    } else {
      return (
        <div>
          <h2>{country.name}</h2>
          <button onClick={toggleDetails}>{toggleText()}</button>
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