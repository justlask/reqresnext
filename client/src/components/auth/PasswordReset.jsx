import React, { Component } from 'react'
import AuthService from './AuthService'

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sent: false
    }
    this.service = new AuthService();
  }

  handleChange = (e) => {
    this.setState({email: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.service.resetPassword(this.state.email)
    .then(data => {
      this.setState({
        sent: true
      })
    })
  }

  render() {
    if (this.state.sent) {
      return (
        <main>
          <p>We have sent your temporary password to your email</p>
          <p>If you do not recieve it, please check your spam folder.</p>
        </main>
      )
    }
    else {
      return (
        <div className="signupbox">
          <h1>Lost Password?</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="email">Email</label><br></br>
            <input type="text" placeholder="email" id="email" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
            <input type="submit" value="submit"/>
          </form>
        </div>
      )
    }
  }
}

export default ResetPassword;