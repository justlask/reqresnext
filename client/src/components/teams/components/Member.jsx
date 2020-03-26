import React from 'react'
import Button from '../../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Member = (props) => {

  const removeMember = (e) => {
    //logic to remove a member from team
    console.log(props.member.name)
    console.log(props.member._id)
    console.log(props.team.name)
    console.log(props.team._id)
  }

  return (
    <div className="teamuser">
    <img src={props.member.image} alt={props.member.name}/>
    <p>{props.member.name}</p>
    <Button title={<FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faTimes} />} onClick={e => removeMember(e)}></Button>
  </div>
  )
}

export default Member
