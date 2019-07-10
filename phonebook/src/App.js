import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')


  const listPersons = () => persons.map(person => 
    <p key={person.name}>{person.name}</p>
  )
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log()

    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject));
    setNewName('');
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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