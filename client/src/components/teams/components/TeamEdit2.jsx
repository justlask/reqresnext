import React, { useState } from 'react'
import Members from './Members'
import Projects from './Projects'
import Invites from './Invites'

const TeamEdit2 = (props) => {
  
  return (!props.show) ? null : (
    <div className="teamedit">
      <br></br>
      <b>Admin:</b>
      <div className="teamuser">
        <img src={props.team.admin.image} />
        <p>{props.team.admin.name}</p>
      </div>
      <br></br>
      <Members team={props.team}/>
      <Projects team={props.team}/>
      <Invites team={props.team} />
    </div>
  )
}

export default TeamEdit2
