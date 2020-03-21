import React, { useState } from 'react'
import TeamEdit from './TeamEdit'

const TeamCard = () => {
  const [showMore, setShowMore] = useState(false)

  const showMoreFunc = (props) => {
    setShowMore(!showMore)
  }

  return (
    <div className="teamcard">
      <div className="teamlist" onClick={showMoreFunc}>
        <h3>{props.team.name}</h3>
      </div>
      <div>
        <TeamEdit updateUser={props.updateUser} user={props.user} team={props.team} show={showMore} showMore={showMoreFunc}/>
      </div>
    </div>
  )

}

export default TeamCard
