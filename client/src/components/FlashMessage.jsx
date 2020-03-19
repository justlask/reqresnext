import React from 'react'

const FlashMessage = (props) => {
  return (props.show) ? (
    <div className={props.thestyle}>
      <p>{props.message}</p>
    </div>
  ) : null
}

export default FlashMessage
