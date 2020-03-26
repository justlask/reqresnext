import React from 'react'
import Project from './Project'

const Projects = (props) => {

  const showProjects = () => {
    return (props.team.projects && props.team.projects.length > 0) ? (
      props.team.projects.map((project, i) => {
        return <Project project={project} key={i} team={props.team}/>
      })
    ) : (
      <div className="teamuser">
        <p>no projects yet</p>
      </div>
    )
  }

  return (
    <div>
      <br></br>
      <b>Projects:</b>
      {showProjects()}
      {/* <AddTeamProject updateUser={props.updateUser} user={props.user} team={props.team} show={projectShowMore} hide={handleShowProject}/> */}
      {/* {handleAddExistingProject()} */}
    </div>
  )
}

export default Projects
