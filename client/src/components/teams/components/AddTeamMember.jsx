import React, { useState } from 'react'
import AuthService from '../../auth/AuthService';
import FlashMessage from '../../FlashMessage';

const AddTeamMember = (props) => {
  const service = new AuthService();
  const [sent, setSent] = useState(false)
  const [invite, setInvite] = useState(null)
  const [flash, setFlash] = useState(false)
  const [message, setMessage] = useState(null)

  const sendInvite = (e) => {
    e.preventDefault();
    (invite && invite.includes("@" && ".")) ? (
      service.sendInvite(props.team, invite.email)
      .then(response => {
        console.log(response)
        props.updateUser()
        props.hide();
        setSent(true)
      })
    ): handleFlash("it's gotta be an email")
  }

  const handleFlash = (message) => {
    setMessage(message);
    setFlash(!flash)
    setTimeout(()=>{
      setFlash(false);
      setMessage(null)
    }, 2000)
  }

  const handleChange = (e) => {
    setInvite(e.target.value)
    console.log(invite)
  }

  const handleCancel = (e) => {
    e.preventDefault();
    props.hide();
  }

  if (props.show && !sent) {
    return (
      <div className="inviteform">
        <form>
        <label>Send An Invite</label><br></br>
          <input type="email" placeholder="enter their email" onChange={e => handleChange(e)}/>
          <input type="submit" value="send it!" onClick={e => sendInvite(e)}/>
          <FlashMessage show={flash} message={message}/>
          <input style={{backgroundColor: 'inherit', color: '#0C0C3E', border: 'none'}}type="submit" value="cancel" onClick={(e) => handleCancel(e)} />
        </form>
      </div>
    )
  }
  if (!props.show && sent) {
    return (
      <div>SENT!</div>
    )
  }
  else {
    return null
  }

}

export default AddTeamMember