import React from 'react'
import Person from './Person'

const Persons = ({ newFilter, persons, deleteEntryAt }) => {

  const filterSearch = (array) => {
    const insensitiveFilter = newFilter.toLowerCase();
    return array.filter(person => 
      person.name.toLowerCase().includes(insensitiveFilter))
  }

  const personsToShow = filterSearch(persons);
  
  const listPersons = () => personsToShow.map(person => 
    <Person 
      key={person.name} name={person.name} number={person.number} 
      deleteHandler={() => deleteEntryAt(person.id, person.name)}
    />
  )
  
  return (
    <div>
      {listPersons()}
    </div>
  )
}

export default Persons