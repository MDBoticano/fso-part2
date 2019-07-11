import React from 'react'
import Person from './Person'

const Persons = ({ newFilter, persons }) => {

  const filterSearch = (array) => {
    const insensitiveFilter = newFilter.toLowerCase();
    // const insensitiveFilter = newFilter;
    return array.filter(person => 
      person.name.toLowerCase().includes(insensitiveFilter))
  }

  const personsToShow = filterSearch(persons);
  
  const listPersons = () => personsToShow.map(person => 
    <Person key={person.name} name={person.name} number={person.number} />
  )
  
  return (
    <div>
      {listPersons()}
    </div>
  )
}

export default Persons