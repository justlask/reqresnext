import React from 'react'
import Member from './Member'

const Members = (props) => {

  const getTeamMembers = () => {
    return (
      props.team.members.map((member, i) => {
        return (
          <Member member={member} key={i} team={props.team}/>
        )
      })
    )
  }

  return (
    <div>
      <b>Members:</b>
      {getTeamMembers()}
    </div>
  )
}

export default Members
