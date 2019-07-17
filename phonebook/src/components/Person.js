import React from 'react'

const Person = ({ name, number, deleteHandler }) => {

  const deleteThisEntry = () => {
    deleteHandler()
  }

  return (
    <>
      <p>{name} {number}</p>
      <button onClick={deleteThisEntry}>Delete</button>
    </>
    
  )
}


export default Person