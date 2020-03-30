import React, { useState } from 'react'
import Button from '../../Button'
import CreateTeamBox from './CreateTeamBox'

const CreateTeam = (props) => {
  const [startTeam, setStartTeam] = useState(false)

  const handleShowCreate = () => {
    setStartTeam(!startTeam)
  }

  return (
    <div>
      <Button className="teambtn" title="create a team" onClick={e => handleShowCreate(e)}></Button>
      <CreateTeamBox user={props.user} teams={props.teams} show={startTeam} hide={handleShowCreate} updateUser={props.updateUser}/>
    </div>
  )
}

export default CreateTeam
