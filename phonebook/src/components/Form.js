import React from 'react'

const Form = ({ handleSubmit, newName, handleNameChange, newNumber, 
  handleNumberChange }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: 
        <input value={newNumber} onChange={handleNumberChange} type="tel"/>
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
  </form>
  )
}

export default Form