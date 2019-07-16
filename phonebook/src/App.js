import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import phonebookService from './services/phonebookService'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  // Use effect hook to get data from db.json
  useEffect(()=> {
    phonebookService
      .getEntries()
      .then(retrievedEntries => {
        setPersons(retrievedEntries)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameExists = persons.find(person => person.name === newName) 
      !== undefined;
    const numberExists = persons.find(person => person.number === newNumber) 
      !== undefined;

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
    } else if (numberExists) {
      alert(`${newNumber} is already added to the phonebook`);
      setNewNumber('');
    }  else if (!numberExists && newName === '') {
      alert(`You need a name with that number!`);
    } else {
      // setPersons(persons.concat({name: newName, number: newNumber}));
      const phonebookEntry = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString()
      }
      
      phonebookService
        // use service to update server db.json
        .createEntry(phonebookEntry) 
        // use returmed data to update local state
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry))
        }) 

      // Reset text fields
      setNewName('');
      setNewNumber('');
    }    
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value); 
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setNewFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter myFilter={newFilter} eventHandler={handleFilterChange}/>

      <h2>add a new</h2>
      <Form handleSubmit={handleSubmit} newName={newName} 
        handleNameChange={handleNameChange} newNumber= {newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} />
    </div>
  )
}

export default App