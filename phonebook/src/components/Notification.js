import React from 'react'

const Notification = ({ status, statusType }) => {
  const notificationStyleNeutral = {
    color: 'black',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    margin: '0 5px 10px 5px'
  }

  const notificationStyleSuccess = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    margin: '0 5px 10px 5px'
  }

  const notificationStyleError = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    margin: '0 5px 10px 5px'
  }

  const notificationStyleWarning = {
    color: 'orange',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    margin: '0 5px 10px 5px'
  }

  let styleToUse = {};
  switch (statusType) {
    case '':
      styleToUse = { ...notificationStyleNeutral };
      break;
    case 'success':
      styleToUse = { ...notificationStyleSuccess };
      break;
    case 'warning':
      styleToUse = { ...notificationStyleWarning };
      break;
    case 'error':
      styleToUse = { ...notificationStyleError };
      break;
    default:
        styleToUse = { ...notificationStyleNeutral };
        break;
  }



  if (status === '' || status === null) {
    return null
    // } else if ( (status !== '' || status !== null) && statusType === 'success') {
    //   return (
    //     <div className="status" style={notificationStyleSuccess}>
    //       {status}
    //     </div>
    //   )
    // } else if ( (status !== '' || status !== null) && statusType === 'error') {
    //   return (
    //     <div className="status" style={notificationStyleError}>
    //       {status}
    //     </div>
    //   )
    // } else if ( (status !== '' || status !== null) && statusType === 'warning') {
    //   return (
    //     <div className="status" style={notificationStyleWarning}>
    //       {status}
    //     </div>
    //   )
  }

  return (
    <div className="status" style={styleToUse}>
      {status}
    </div>
  )
}

export default Notification