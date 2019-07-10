import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const listPersons = () => persons.map(person => 
    <p key={person.name}>{person.name} {person.number}</p>
  )
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log()

    // Don't allow addition of already existing names
    let nameExists = persons.find(person => person.name === newName);
    let numberExists = persons.find(person => person.number === newNumber);

    if (nameExists !== undefined) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
    } else if (numberExists !== undefined) {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
                    value={newNumber} 
                    onChange={handleNumberChange}
                    type="tel" 
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // 123-456-7890
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