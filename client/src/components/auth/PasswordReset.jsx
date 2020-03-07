import React, { useState } from 'react'
import AuthService from './AuthService'
import Button from '../Button'
import FlashMessage from '../FlashMessage'

const ResetPassword = () => {
  const service = new AuthService();
  const [email, setEmail] = useState(undefined);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState(false);
  const [flash, setFlash] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const cancelFlash = () => {
    setFlash(false);
  }

  const handleFlash = (message) => {
    setFlash(true);
    setMessage(message);
    setTimeout(() => cancelFlash(), 4000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === undefined || !email.includes('@' && '.')) {
      handleFlash('enter a valid email')
    } 
    else {
      setSent(!sent)
      service.resetPassword(email)
      .then(response => {})
    }
  }

    return (sent === true) ? (
      <main className="emailsent">
        <img style={{width: '150px', height: 'auto'}}src="./mail.png" alt=""/>
        <h1 style={{fontWeight: 500, fontSize: '32px'}}>Okay, here it comes!</h1>
        <p>We've sent a temporary password to your email.</p>
        <p>If you don't see it, please check your spam folder.</p>
      </main>
    ):
    (
      <div className="signup" style={{minHeight: '40vh'}}>
        <div>
          <h1 style={{fontSize: '32px'}}>So... you forgot your password,<br></br>huh?</h1>
          <p>It happens.<br></br> We got you covered.</p>
        </div>
        <form className="signupform">
        <label for="email">Email</label>
        <input type="text" name="email" value={email} onChange={ e => handleChange(e)} required/>
        <FlashMessage thestyle='flashemail' show={flash} message={message}/>
        <Button title="help!" className="signupbtn" onClick={(e) => handleSubmit(e)}/>
        </form>
      </div>
    )

}

export default ResetPassword;