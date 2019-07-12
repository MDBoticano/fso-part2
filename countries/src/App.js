import React, { useState, useEffect } from 'react';
import './App.css';
import Countries from './components/Countries';

import axios from 'axios';

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  /* Fetches countries data once */
  useEffect(()=> {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('fulfilled promise');
        setCountries(response.data);
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  }


  return(
    <div>
      <form>
        <input value={filter} onChange={handleFilterChange} />
      </form>
      <Countries filter={filter} countries={countries}/>
    </div>
  )
}

export default App;
