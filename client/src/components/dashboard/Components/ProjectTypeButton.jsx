import React from 'react'
import Button from '../../Button'

const ProjectTypeButton = (props) => {

  const handleProjects = () => {
    props.setType(props.type)
    props.handleProjects(props.type)

  }

  return (props.type === props.isActive) ? 
  <Button className="activeActionButton" onClick={e => handleProjects(props.type)} title={props.type} /> :
  <Button className="notActiveActionButton" onClick={e => handleProjects(props.type)} title={props.type}/>
}

export default ProjectTypeButton
