import React from 'react'
import Button from '../../Button'
import AuthService from '../../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Project = (props) => {
  const service = new AuthService();

  const removeProject = (e) => {
    console.log(props.project.title)
    console.log(props.project._id)
    console.log(props.team.name)
    console.log(props.team._id)

    service.removeProjectFromTeam(props.team._id, props.project._id)
    .then(response => {
      
    })
  }

  return (
    <div className="teamuser">
      <p>{props.project.title}</p>
      <Button title={<FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faTimes} />} onClick={e => removeProject(e)}></Button>
    </div>
  )
}

export default Project
