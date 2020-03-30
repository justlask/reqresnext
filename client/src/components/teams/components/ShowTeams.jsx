import React from 'react'
import TeamCard from './TeamCard'

const ShowTeams = (props) => {


  const showTeams = (e) => {
    return props.teams.map((team, i) => {
      return <TeamCard updateUser={props.updateUser} user={props.user} team={team} key={i} />
    })
  }
  return (
    <div>
      <h1>Your Teams:</h1>
      {showTeams()}
    </div>
  )
}

export default ShowTeams
