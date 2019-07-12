import React, { useState } from 'react';
import './App.css';
import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  }

  return(
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries nameFilter={filter} />
    </div>
  )
}

export default App;
