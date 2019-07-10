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

    // Don't allow addition of already existing names: if/else
    // if (persons.find( (person) => person.name === newName) !== undefined) {
    //   alert(`${newName} is already added to the phonebook`);
    // } else {
    //   const personObject = {
    //     name: newName
    //   }
    //   setPersons(persons.concat(personObject));
    // }    

    // Don't allow addition of already existing names: ternary
    persons.find(person => person.name === newName) !== undefined
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat({name: newName}))

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