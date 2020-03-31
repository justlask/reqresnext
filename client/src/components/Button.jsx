import React from 'react'

const Button = (props) => {
  return <button className={props.className} style={props.style} onClick={props.onClick}>{props.title}</button>
}

export default Button
