import React from 'react'

const Countries = ({ filter, countries }) => {
  
  const filterCountries = (array) => {
    const caseInsensitive = filter.toLowerCase();
    return array.filter(country => 
      country.name.toLowerCase().includes(caseInsensitive))
  }

  const countriesToDisplay = filterCountries(countries);
  
  const mapCountries = () => countriesToDisplay.map(country => 
    <p key={country.name}>{country.name}</p>
  )
  
  return (
    <div>
      {mapCountries()}
    </div>
  )
}


export default Countries