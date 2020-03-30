import React, { useState } from 'react'
import Members from './Members'
import Projects from './Projects'
import Invites from './Invites'

const TeamEdit = (props) => {
  
  return (!props.show) ? null : (
    <div className="teamedit">
      <br></br>
      <b>Admin:</b>
      <div className="teamuser">
        <img src={props.team.admin.image} />
        <p>{props.team.admin.name}</p>
      </div>
      <br></br>
      <Members team={props.team} updateUser={props.updateUser} user={props.user}/>
      <Projects team={props.team} updateUser={props.updateUser} user={props.user}/>
      <Invites team={props.team} updateUser={props.updateUser} user={props.user}/>
    </div>
  )
}

export default TeamEdit
