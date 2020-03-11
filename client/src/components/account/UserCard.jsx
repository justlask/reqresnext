import React from 'react'


const UserCard = (props) => {
  return (props.user) ? (
    <div>
      <h1>{props.user.name}</h1>
      <h2 style={{fontWeight: 'normal', fontSize: '20px'}}>{props.user.position}</h2>
    </div>
  ) : null
}

export default UserCard