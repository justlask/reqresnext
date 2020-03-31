import React from 'react'
import Button from '../../Button'

const TeamButton = (props) => {

  const handleTeams = () => {
    props.handleTeam(props.team)
    props.setType(props.type)
  }
  return (props.type === props.isActive) ?
    <Button style={{backgroundColor: '#0c0c3e', color: 'white', borderRadius: '8px', padding: '5px 10px', margin: '5px', cursor: 'pointer'}} title={props.type} onClick={(e) => handleTeams()}></Button> :
    <Button style={{border: '1px solid #0c0c3e', borderRadius: '8px', padding: '5px 10px', margin: '5px', cursor: 'pointer'}} title={props.type} onClick={(e) => handleTeams()}></Button>
}

export default TeamButton
