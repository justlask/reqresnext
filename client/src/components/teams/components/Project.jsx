import React from 'react'
import Button from '../../Button'
import AuthService from '../../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Project = (props) => {
  const service = new AuthService();

  const removeProject = (e) => {
    service.removeProjectFromTeam(props.team, props.project)
    .then(response => {
      props.updateUser()
    })
  }

  return (props.project) ? (
    <div className="teamuser">
      <p>{props.project.title}</p>
      <Button title={<FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faTimes} />} onClick={e => removeProject(e)}></Button>
    </div>
  ) : null
}

export default Project
