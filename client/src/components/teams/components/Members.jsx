import React, { useState } from 'react'
import Button from '../../Button'
import Member from './Member'
import AddTeamMember from './AddTeamMember'

const Members = (props) => {
  const [show, setShow] = useState(false)

  
  const getTeamMembers = () => {
    return (props.team.members && props.team.members.length > 0) ? (
      props.team.members.map((member, i) => {
        return (
          <Member member={member} key={i} team={props.team} user={props.user}/>
        )
      })
    ) : (
      <div className="teamuser">
        <p>no members yet</p>
      </div>
    )
  }

  const addTeamMember = () => {
    return <p>hi</p>
  }

  return (
    <div>
      <div onClick={(e)=>setShow(!show)}>
        <b style={{cursor: 'pointer'}}>Members:</b>
      </div>
      {(show) ? getTeamMembers() : null}
      {(show) ? <AddTeamMember team={props.team} show={show}/> : null}
    </div>
  )
}

export default Members
