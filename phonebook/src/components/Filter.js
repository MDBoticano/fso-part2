import React from 'react'

const Filter = (props) => {

  return (
    <div>
      filter shown with <input value={props.myFilter} onChange={props.eventHandler}/>
    </div>
  )
}


export default Filter