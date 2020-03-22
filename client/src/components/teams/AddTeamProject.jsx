import React, { useState } from 'react'
import AuthService from '../auth/AuthService'

const AddTeamProject = (props) => {
  const service = new AuthService();
  const [project, setProject] = useState(null)

  const handleCancel = (e) => {
    e.preventDefault();
    props.hide();
  }

  const handleSelect = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  }

  const handleOptions = () => {
    return props.user.projects.map((project, i) => {
      return (
        <option key={i} value={project._id}>{project.title}</option>
      )
    })
  }

  const submitChoice = (e) => {
    e.preventDefault();
    let projectID = project
    let team = props.team._id

    console.log('project    ' + this.state.project)
    console.log('team    ' + team)

    service.addProjectToTeam(team, projectID)
    .then(response => {
      console.log(response)
      props.updateUser();
      props.hide();
    })
  }

  return (!props.show) ? null : (
    <div className="inviteform">
      <form>
      <label>Add Existing Project</label><br></br>
        <select defaultValue="no-value" name="project" onChange={e => handleSelect(e)}>
        <option value='no-value' disabled>Select one</option>
          {handleOptions()}
        </select>
        <input type="submit" value="submit" onClick={(e) => submitChoice(e)}/>
        <input style={{backgroundColor: 'inherit', color: '#0C0C3E', border: 'none'}}type="submit" value="cancel" onClick={(e) => handleCancel(e)} />
      </form>
    </div>
  )
}

export default AddTeamProject