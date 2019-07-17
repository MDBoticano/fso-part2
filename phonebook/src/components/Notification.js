import React from 'react'

const Notification = ({ status }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    margin: '0 5px 10px 5px'
  }


  if (status === '' || status === null) {
    return null
  }

  return (
    <div className="status" style={notificationStyle}>
      {status}
    </div>
  )
}

export default Notification