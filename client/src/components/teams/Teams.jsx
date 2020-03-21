import React, { useState } from 'react'
import Button from '../Button'
import CreateTeam from './CreateTeam'

const Teams = (props) => {
  const [startTeam, setStartTeam] = useState(false)
  const [editTeam, setEditTeam]  = useState(false)

  const handleShowCreate = () => {
    setStartTeam(!startTeam)
  }

  return (
    <div className="teams">
      <div className="teambox">
          <Button className="teambtn" title="create a team" onClick={e => handleShowCreate(e)}></Button>
          <CreateTeam user={props.user} teams={props.teams} show={startTeam} hide={handleShowCreate} updateUser={props.updateUser} />
      </div>
    </div>
  )
}

export default Teams
