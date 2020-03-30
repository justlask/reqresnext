import React from 'react'
import CreateTeam from './components/CreateTeam'
import ShowTeams from './components/ShowTeams'

const Teams = (props) => {
  return (
    <div className="teams">
      <div className="teambox">
        <CreateTeam user={props.user} teams={props.teams} updateUser={props.updateUser}/>
        <ShowTeams user={props.user} teams={props.teams} updateUser={props.updateUser}/>
      </div>
    </div>
  )
}

export default Teams
