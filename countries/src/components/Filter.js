import React from 'react'

const Filter = ({value, onChange }) => {
  return (
    <form>
      <label>Search countries </label>
      <input value={value} onChange={onChange} />
    </form>
  )
}

export default Filter