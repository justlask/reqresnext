import React, { useState } from 'react'
import AuthService from '../../auth/AuthService'
import Button from '../../Button'

const CreateTeamBox2 = (props) => {
  const service = new AuthService();
  const [team, setTeam] = useState(null)

  const handleChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value
    })
  }

  const submitNewTeam = (e) => {
    e.preventDefault();
    service.createTeam(team)
    .then(response => {
      props.updateUser();
      props.hide();
    })
  }

  const cancelStartNewTeam = (e) => {
    e.preventDefault();
    setTeam(null)
    props.hide();
  }

  

  return (props.show) ? (
    <div className="createform">
      <form className="teamform">
        <label>Team Name</label>
        <input type="text" name="name" placeholder="what are you going to call your team?" onChange={e => handleChange(e)}/>
        <div>
        <Button title="cancel" onClick={(e) => cancelStartNewTeam(e)}></Button>
        <input type="submit" value="create team" onClick={e => submitNewTeam(e)}/>
        </div>
      </form>
    </div>
  ) : null
}

export default CreateTeamBox2
