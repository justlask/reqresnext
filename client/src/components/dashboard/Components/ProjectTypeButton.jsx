import React from 'react'
import Button from '../../Button'

const ProjectTypeButton = (props) => {
  return (props.type === props.isActive) ? 
  <Button className="activeActionButton" onClick={e =>  props.setType(props.type)} title={props.type} /> :
  <Button className="notActiveActionButton" onClick={e =>  props.setType(props.type)} title={props.type}/>
}

export default ProjectTypeButton
