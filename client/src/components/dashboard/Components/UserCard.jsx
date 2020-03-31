import React, { useState } from 'react'
import TeamButton from '../Components/TeamButton'

const UserCard = (props) => {
  const [type, setType] = useState('All Projects')

  const handleTeam = (team) => {
    props.setTeam(team)
  }

  const handleTeams = () => {
    return (props.teams && props.teams.length > 0) ? (
      <div style={{display: 'flex'}}>
        <TeamButton type="All Projects" handleTeam={handleTeam} setType={setType} isActive={type}/>
        {props.teams.map((team, i) => {
          return <TeamButton team={team} type={team.name} handleTeam={handleTeam} setType={setType} isActive={type}/>
        })}
      </div>
    ) : null
  }


  return (
    <div className="usercard">
      <img src={props.user.image} alt="profile"/>
      <h2>{props.user.name}</h2>
      <h3>{props.user.position}</h3>
      {handleTeams()}
    </div>
  )
}

export default UserCard
