import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'
import Persons from './components/Persons'
import phonebookService from './services/phonebookService'



const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ statusMessage, setStatusMessage ] = useState('')
  const [ statusType, setStatusType ] = useState('')

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

    // Decide which fields to reset after each condition
    if (nameExists && numberExists && newNumber !== '') {
      alert(`${newName} and ${newNumber} is already added to the phonebook. ` + 
        `Please edit only one existing value at a time`);
      setNewName('');
      setNewNumber('');
      // Note: can delete one name and update number on another, but confusing
    } else if (nameExists && !numberExists) {
      // alert(`${newName} is already added to the phonebook`);
      if(window.confirm(`${newName} is already added to the phonebook. ` +
        `Do you want to update ${newName}'s number?`)) {
        // update
        updateNumberOf(newName, newNumber)

        // setStatusMessage( `Updated ${newName}'s number to ${newNumber}` )
        // setStatusType('success')
        // setTimeout(() => {
        //   setStatusMessage(null)
        // }, 5000)

        setNewNumber('');
      }
      setNewName('');
    } else if (numberExists && !nameExists && newNumber !== '') {
      // alert(`${newNumber} is already added to the phonebook`);
      if(window.confirm(`${newNumber} is already added to the phonebook. ` +
        `Do you want to update ${newNumber}'s owner?`)) {
        // update
        updateNameOf(newNumber, newName)

        // setStatusMessage( `Updated ${newNumber}'s owner to ${newName}` )
        // setStatusType('success')
        // setTimeout(() => {
        //   setStatusMessage(null)
        // }, 5000)
        setNewName('');
      }
      setNewNumber('');
    }  else if (nameExists && newNumber === '') {
      alert(`${newName} is already added to the phonebook. ` + 
      `Provide a phone number to update ${newName}'s entry, ` + 
      `or create an entry with a different name.`);
    setNewName('');
    setNewNumber('');
    
    } else if (!numberExists && newName === '') {
      alert(`You need a name with that number!`);
    } else {

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
        .then(() => {
          console.log(`Successfully added ${newName}`)
          setStatusMessage(`Added ${newName}`)
          setStatusType('success')
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          // setStatusMessage(`Failed to add ${newName}`)
          setStatusMessage(error.response.data.error)
          setStatusType('error')
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
        }) 
      
      // Reset text fields
      setNewName('');
      setNewNumber('');
    }    
  }

  // Modifies server to change number of a user with a specific name
  const updateNumberOf = (name, number) => {
    // Find the phonebook entry with a matching name
    const entry = persons.find(person => person.name === name)
    const entryID = entry.id

    // Create a modified entry
    const modifiedEntry = {...entry, number: number}
    console.log(modifiedEntry);

    console.log("Updating entry in frontend: App.js updateNumberOf()")
    phonebookService
      .updateEntry(entryID, modifiedEntry)
      .then(returnedEntry => {
        setPersons(persons.map(person => {
          if (person.id !== entryID) { return person }
          else { return returnedEntry }
        }))
      })
      .then(()=> {
        console.log("Successfully updated phone number of entry")
        setStatusMessage( `Updated ${newName}'s number to ${newNumber}` )
        setStatusType('success')
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log("Failed to update phone number of entry")
        console.log(error.response.data.error)
        // console.log(error)
        // setStatusMessage("Failed to update entry's phone number") 
        setStatusMessage(error.response.data.error)
        setStatusType('error')
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      }) 
  }

  // Modifies server to change name of a number
  const updateNameOf = (number, name) => {
    // Find the phonebook entry with a matching number
    const entry = persons.find(person => person.number === number)
    const entryID = entry.id

    // Create a modified entry
    const modifiedEntry = {...entry, name: name}
    console.log(modifiedEntry);

    console.log("Updating entry in frontend: App.js updateNameOf()")
    phonebookService
      .updateEntry(entryID, modifiedEntry)
      .then(returnedEntry => {
        setPersons(persons.map(person => {
          if (person.id !== entryID) { return person }
          else { return returnedEntry }
        }))
      })
      .then(() => {
        console.log("Successfully updated name number of phone number entry")
        setStatusMessage( `Updated ${newNumber}'s owner to ${newName}` )
        setStatusType('success')
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      })
      .catch(error => { 
        console.log("Failed to update name of phone number entry")
        console.log(error)
        console.log(error.response.data.error)    

        if (error.response.data.error.type !== 'ValidationError') {
          setStatusMessage(error.response.data.error)
          setStatusType('error')
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
        
        } 
        // A non validation error, presumbaly data not on server but only local
        else {
          setStatusMessage(
            `The entry for '${name}' was already deleted from the server`
          )
          setStatusType('error')
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
          
          // delete
          setPersons(persons.filter(p => p.id !== entryID)) 
        } 
      })
  }

  const deleteEntryAt = (id) => {
    const idName = (persons.find(p => p.id = id)).name; 
    // idName wrong, but id right
    console.log(idName);
    // Confirm delete
    if(window.confirm(`Do you really want to delete '${idName}''s entry? `)) {
      phonebookService
        // Delete data from server at id and fetch server data once again
        .deleteEntry(id)
        // Then update state with new server data (also triggers re-render)
        .then(retrievedEntries => {
            console.log('entries retreived after deletion', persons)
            setPersons(retrievedEntries)
          }
        )
      
      console.log(idName)
      setStatusMessage(
        `The entry for '${idName}' was successfully removed from the server`
      )
      setStatusType('warning')
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
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

      <Notification status={statusMessage} statusType={statusType} />

      <Filter myFilter={newFilter} eventHandler={handleFilterChange}/>

      <h2>add a new</h2>
      <Form 
        handleSubmit={handleSubmit} newName={newName} 
        handleNameChange={handleNameChange} newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons 
        newFilter={newFilter} persons={persons} deleteEntryAt={deleteEntryAt}
      />
    </div>
  )
}

export default App