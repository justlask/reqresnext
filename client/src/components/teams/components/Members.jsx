import React, { useState } from 'react'
import Member from './Member'

const Members = (props) => {
  const [show, setShow] = useState(false)

  
  const getTeamMembers = () => {
    return (
      props.team.members.map((member, i) => {
        return (
          <Member member={member} key={i} team={props.team} user={props.user}/>
        )
      })
    )
  }

  return (
    <div>
      <div onClick={(e)=>setShow(!show)}>
        <b style={{cursor: 'pointer'}}>Members:</b>
      </div>
      {(show) ? getTeamMembers() : null}
    </div>
  )
}

export default Members
