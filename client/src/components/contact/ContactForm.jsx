import React, { useState } from 'react'
import Button from '../Button'
import AuthService from '../auth/AuthService'
import FlashMessage from '../FlashMessage'

const ContactForm = () => {
  const service = new AuthService();
  const [contact, setContact] = useState({name: null, email: null, message: null})
  const [sent, setSent] = useState(false)
  const [flash, setFlash] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (event) => {  
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (contact.email && contact.email.includes('@' && '.')) {
      setSent(true)
      service.contact(contact.name, contact.email, contact.message)
      .then(data => {
      })
    }
    else {
      setFlash(true);
      console.log('I need an email to email you back!')
      handleFlash('I need an email to email you back!')
    }
  }
  const handleFlash = (message) => {
    setMessage(message);
    setTimeout(() => {
      setFlash(false);
      setMessage(null);
    }, 4000)
  }

  return (sent === true) ? (
      <main className="emailsent">
        <img style={{width: '150px', height: 'auto'}}src="./mail.png" alt=""/>
        <h1 style={{fontWeight: 500, fontSize: '32px'}}>Hey {contact.name}, your message is on it's way!</h1>
        <p>Thank you for taking the time to reach out to us.</p>
        <p>We look forward to reading your message. 😎</p>
      </main>
    ) : (
      <div className="signup">
        <div>
          <h1 style={{fontSize: '32px'}}>Have a comment, suggestion, issue,<br></br> or just want to reach out?</h1>
          <p>We'd love to hear from you.</p>
        </div>
        <form className="signupform">
          <label>Name*</label>
          <input type="text" name="name" value={contact.name} onChange={ e => handleChange(e)} required/>
          <label>Email*</label>
          <input type="text" name="email" value={contact.email} placeholder="an actual email please" onChange={ e => handleChange(e)} required/>
          <label>Message*</label>
          <textarea name="message" value={contact.message} placeholder="Tell me....." onChange={ e => handleChange(e)} required/>
          <FlashMessage show={flash} message={message} thestyle="flashemail"/>
          <Button title="send" className="signupbtn" onClick={(e) => handleFormSubmit(e)}/>
        </form>
      </div>
    )
}

export default ContactForm