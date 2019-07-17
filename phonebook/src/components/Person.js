import React from 'react'

const Person = ({ name, number, deleteHandler }) => {

  const deleteThisEntry = () => {
    deleteHandler()
  }

  return (
    <>
      <div>
        {name} {number} { }
        <button onClick={deleteThisEntry}>Delete</button>
      </div>
    </>
    
  )
}


export default Person