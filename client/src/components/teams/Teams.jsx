import React from 'react'
import CreateTeam2 from '../components/CreateTeam2'
import ShowTeams2 from '../components/ShowTeams2'

const Teams = (props) => {
  return (
    <div className="teams">
      <div className="teambox">
        <CreateTeam2 user={props.user} teams={props.teams} updateUser={props.updateUser}/>
        <ShowTeams2 user={props.user} teams={props.teams} updateUser={props.updateUser}/>
      </div>
    </div>
  )
}

export default Teams
