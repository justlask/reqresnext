import React from 'react'
import AuthService from '../../auth/AuthService'
import Button from '../../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Member = (props) => {
  const service = new AuthService();

  const removeMember = (e) => {
    //logic to remove a member from team
    service.removeMemberFromTeam(props.team._id, props.member._id)
    .then(response => {
      console.log(response)
      // console.log('member has been removed')
    })
  }

  return (
    <div className="teamuser">
    <img src={props.member.image} alt={props.member.name}/>
    <p>{props.member.name}</p>
    {(props.user._id == props.team.admin._id && props.user._id != props.member._id) ? <Button title={<FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faTimes} />} onClick={e => removeMember(e)}></Button> : null}
  </div>
  )
}

export default Member
