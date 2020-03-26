import React from 'react'

const Invites = (props) => {

  const showInvites = () => {
    return (props.team.invites && props.team.invites.length > 0) ? (
      props.team.invites.map((invited, i) => {
        return (
          <div className="teamuser" key={i}>
            <p>{invited.email}</p>
          </div>
        )
      })
    ) : (
      <div className="teamuser">
        <p>no pending invites</p>
      </div>
    )
  }

  return (
    <div>
      <br></br>
      <b>Pending Invites:</b>
      {showInvites()}
      {/* <TeamMemberInvite updateUser={props.updateUser} team={props.team} show={showMore} hide={handleShow} /> */}
      {/* {handleInviteButton()} */}
    </div>
  )
}

export default Invites
