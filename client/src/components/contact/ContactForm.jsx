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
    }
  }

  handleFormSubmit = () => {
    console.log(this.state)
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
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
        <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)} required/>
        <label>Message*</label>
        <textarea name="message" value={this.state.message} onChange={ e => this.handleChange(e)} required/>
        <Button title="send" className="signupbtn" onClick={(e) => this.handleFormSubmit(e)}/>
      </form>
    </div>
    )
  }
}



