import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const filterSearch = (array) => {
    return array.filter(person => person.name.toLowerCase().includes(newFilter))
  }

  const personsToShow = filterSearch(persons);
  
  const listPersons = () => personsToShow.map(person => 
    <p key={person.name}>{person.name} {person.number}</p>
  )
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log()

    // Don't allow addition of already existing names
    let nameExists = persons.find(person => person.name === newName) !==
                     undefined;
    let numberExists = persons.find(person => person.number === newNumber) !== 
                       undefined;

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
    } else if (numberExists) {
      alert(`${newNumber} is already added to the phonebook`);
      setNewNumber('');
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}));
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
      filter shown with <input value={newFilter} onChange={handleFilterChange}/>

      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
                    value={newNumber} 
                    onChange={handleNumberChange}
                    type="tel" 
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // 123-456-7890
                    // pattern="\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|
                    //   2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|
                    //   4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$"
                  />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {listPersons()}
    </div>
  )
}

export default App