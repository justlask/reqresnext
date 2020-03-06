import React, { Component } from 'react'
import AuthService from './AuthService'
import Button from '../Button'

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false
    }
    this.service = new AuthService();
  }

  handleChange = (e) => {
    this.setState({email: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      sent: true
    })
    this.service.resetPassword(this.state.email)
    .then(data => {
    })
  }

  render() {
    if (this.state.sent === true) {
      return (
        <main className="emailsent">
          <img style={{width: '150px', height: 'auto'}}src="./mail.png" alt=""/>
          <h1 style={{fontWeight: 500, fontSize: '32px'}}>Okay, here it comes!</h1>
          <p>We've sent a temporary password to your email.</p>
          <p>If you don't see it, please check your spam folder.</p>
        </main>
      )
    }
    else {
      return (
        <div className="signup" style={{minHeight: '40vh'}}>
        <div>
          <h1 style={{fontSize: '32px'}}>So... you forgot your password,<br></br>huh?</h1>
          <p>It happens.<br></br> We got you covered.</p>
        </div>
        <form className="signupform">
        <label>Email</label>
        <input type="text" name="email" onChange={ e => this.handleChange(e)} required/>
        <Button title="help!" className="signupbtn" onClick={(e) => this.handleSubmit(e)}/>
        </form>
      </div>
      )
    }
  }
}

export default ResetPassword;