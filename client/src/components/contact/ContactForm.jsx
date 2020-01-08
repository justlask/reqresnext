import React, { Component } from 'react'
import Button from '../Button'
import AuthService from '../auth/AuthService'

export default class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      name: '',
      email: '',
      message: '',
      sent: false
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    let email = this.state.email
    if (email.includes('@') && email.includes('.')) {
      this.setState({
        sent: true
      })
      this.service.contact(this.state.name, this.state.email, this.state.message)
      .then(data => {
      })
    }
    else {
      console.log('I need an email to email you back!')
    }
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    if (this.state.sent === true) {
      return (
        <main className="emailsent">
          <img style={{width: '150px', height: 'auto'}}src="./mail.png" alt=""/>
      <h1 style={{fontWeight: 500, fontSize: '32px'}}>Hey {this.state.name}, your message is on it's way!</h1>
          <p>Thank you for taking the time to reach out to us.</p>
          <p>We look forward to reading your message. 😎</p>
        </main>
      )
    }
    else {
      return (
        <div className="signup">
          <div>
            <h1 style={{fontSize: '32px'}}>Have a comment, suggestion, issue,<br></br> or just want to reach out?</h1>
            <p>We'd love to hear from you.</p>
          </div>
          <form className="signupform">
          <label>Name*</label>
          <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)} required/>
          <label>Email*</label>
          <input type="text" name="email" value={this.state.email} placeholder="an actual email please" onChange={ e => this.handleChange(e)} required/>
          <label>Message*</label>
          <textarea name="message" value={this.state.message} placeholder="Tell me....." onChange={ e => this.handleChange(e)} required/>
          <Button title="send" className="signupbtn" onClick={(e) => this.handleFormSubmit(e)}/>
        </form>
      </div>
      )
    }
  }
}



