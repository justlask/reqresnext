import React, { useState } from 'react'
import TeamEdit2 from './TeamEdit2'

const TeamCard2 = (props) => {
  const [show, setShow] = useState(false)

  const showMore = () => {
    setShow(!show)
  }

  return (
    <div className="teamcard">
      <div className="teamlist" onClick={showMore}>
        <h3>{props.team.name}</h3>
      </div>
      <div>
        <TeamEdit2 updateUser={props.updateUser} user={props.user} team={props.team} show={show} showMore={showMore}/>
      </div>
    </div>
  )
}

export default TeamCard2
