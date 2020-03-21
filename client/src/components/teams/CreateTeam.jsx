import React, { useState } from 'react'
import AuthService from '../auth/AuthService'
import TeamCard from './TeamCard'

const CreateTeam = (props) => {
  const service = new AuthService();
  const [team, setTeam] = useState(null)

  const submitNewTeam = (e) => {
    e.preventDefault();
    service.createTeam(team)
    .then(response => {
      props.updateUser();
      props.hide();
    })
  }

  const handleChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value
    })
  }

  const showTeams = (e) => {
    return (
      props.teams.map((team, i) => {
        return <TeamCard updateUser={props.updateUser} user={props.user} team={team} key={i} />
      })
    )
  }

  return (props.show) ? (
      <div className="createform">
        <form className="teamform">
          <label>Team Name</label>
          <input type="text" name="name" placeholder="what are you going to call your team?" onChange={e => handleChange(e)}/>
          <input type="submit" value="create my team!" onClick={e => submitNewTeam(e)}/>
        </form>
      </div>
  ) : (
    <div>
      <h1>Your Teams:</h1>
      {showTeams()}
    </div>
  )
}

export default CreateTeam