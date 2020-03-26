import React from 'react'
import TeamCard2 from './TeamCard2'

const ShowTeams2 = (props) => {

  const showTeams = (e) => {
    return props.teams.map((team, i) => {
      return <TeamCard2 updateUser={props.updateUser} user={props.user} team={team} key={i} />
    })
  }
  return (
    <div>
      <h1>Your Teams:</h1>
      {showTeams()}
    </div>
  )
}

export default ShowTeams2
