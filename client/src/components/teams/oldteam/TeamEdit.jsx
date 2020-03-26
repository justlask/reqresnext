import React, { useState } from 'react'
import Button from '../Button'
import TeamMemberInvite from './TeamMemberInvite'
import AddTeamProject from './AddTeamProject'

const TeamEdit = (props) => {
  const [showMore, setShowMore] = useState(false)
  const [projectShowMore, setProjectShowMore] = useState(false)

  const getTeamMembers = () => {
    return (
      props.team.members.map((member, i) => {
        return (
          <div className="teamuser" key={i}>
            <img src={member.image} />
            <p>{member.name}</p>
          </div>
          )
      })
    )
  }

  const handleInvites = () => {
    return (props.team.invites && props.team.invites.length > 0) ? (
      props.team.invites.map((invited, i) => {
        return (
        <div className="teamuser" key={i}>
          <p>{invited.email}</p>
        </div>
        )
      })
    ) : (
      <div className="teamuser">
        <p>no pending invites</p>
      </div>
    )
  }

  const handleProjects = () => {
    return (props.team.projects && props.team.projects.length > 0) ? (
      props.team.projects.map((project, i) => {
        return (
        <div className="teamuser" key={i}>
          <p>{project.title}</p>
        </div>
        )
      })
    ) : (
      <div className="teamuser">
        <p>no projects yet</p>
      </div>
    )
  }

  const handleShow = () => {
    setShowMore(!showMore)
  }

  const handleInviteButton = () => {
    return (showMore) ? null : <Button className="teambtn" title="invite member" onClick={handleShow}></Button>
  }

  const handleAddExistingProject = () => {
    return (projectShowMore) ? null : <Button className="teambtn" title="add existing project" onClick={handleShowProject}></Button>
  }
  
  const handleShowProject = () => {
    setProjectShowMore(!projectShowMore)
  }

  return (!props.show) ? null : (
    <div className="teamedit">
      <br></br>
      <b>Admin:</b>
      <div className="teamuser">
        <img src={props.team.admin.image} />
        <p>{props.team.admin.name}</p>
      </div>
      <br></br>
      <div>
        <b>Members:</b>
        {getTeamMembers()}
      </div>
      <div>
        <br></br>
        <b>Projects:</b>
        {handleProjects()}
        <AddTeamProject updateUser={props.updateUser} user={props.user} team={props.team} show={projectShowMore} hide={handleShowProject}/>
        {handleAddExistingProject()}
      </div>
      <div>
        <br></br>
        <b>Pending Invites:</b>
        {handleInvites()}
        <TeamMemberInvite updateUser={props.updateUser} team={props.team} show={showMore} hide={handleShow} />
        {handleInviteButton()}
      </div>
    </div>
  )

}

export default TeamEdit