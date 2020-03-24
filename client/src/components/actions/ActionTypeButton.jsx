import React, { useState } from 'react'
import Button from '../Button'

const ActionTypeButton = (props) => {

  return (props.type === props.isActive) ? <Button className="activeActionButton" onClick={e => props.getTasks(props.type)} title={props.type} /> :
<Button className="notActiveActionButton" onClick={e => props.getTasks(props.type)} title={props.type}/>

}

export default ActionTypeButton
