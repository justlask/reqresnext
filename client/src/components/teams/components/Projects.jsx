import React, { useState } from 'react'
import Button from '../../Button'
import Project from './Project'
import AddTeamProject from './AddTeamProject'

const Projects = (props) => {
  const [show, setShow] = useState(false)
  const [showMore, setShowMore] = useState(false)


  const showProjects = () => {
    return (props.team.projects && props.team.projects.length > 0) ? (
      props.team.projects.map((project, i) => {
        return <Project project={project} key={i} team={props.team} updateUser={props.updateUser}/>
      })
    ) : (
      <div className="teamuser">
        <p>no projects yet</p>
      </div>
    )
  }

  const handleShowProject = () => {
    setShowMore(!showMore)
  }

  return (
    <div>
      <div onClick={(e) => setShow(!show)}>
        <b>Projects:</b>
      </div>
      {(show) ? showProjects() : null}
      <AddTeamProject updateUser={props.updateUser} user={props.user} team={props.team} show={showMore} hide={handleShowProject}/>
      {(show) ? <Button className="teambtn" title="add existing project" onClick={handleShowProject}></Button> : null}
    </div>
  )
}

export default Projects
