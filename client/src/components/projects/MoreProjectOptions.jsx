import React from 'react'
import Button from '../Button'

const MoreProjectOptions = (props) => {

  const handleComplete = () => {
    return (props.project.complete) ?  
    <Button className="noButtonEdit" onClick={e => props.markIncomplete()} title="Mark As Incomplete"></Button> 
    : <Button className="noButtonEdit" onClick={e => props.markComplete()} title="Mark As Complete"></Button>
  }

  return (!props.show) ? null :
  (
    <div className="editme">
      <Button className="noButtonEdit" title="Edit this project" onClick={e => props.toggleEdit(e)}></Button>
      {handleComplete()}
      <Button className="noButtonEdit" title="Delete this project" onClick={e => props.deleteProject(e)}></Button>
    </div>
  )

}

export default MoreProjectOptions
