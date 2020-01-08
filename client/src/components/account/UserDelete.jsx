import React, { Component } from 'react'
import Button from '../Button'
import AuthService from '../auth/AuthService'

export default class UserDelete extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      password: '',
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  submitChange = (e) => {
    e.preventDefault();
      this.service.deleteAccount(this.state)
      .then(response => {
      })
  }

  render() {
    return (
      <div>
        <h3 style={{fontWeight: 400, textAlign: 'left'}}>Well this is sad, 😔</h3>
        <form className="editbox">
          <label style={{textAlign: 'left'}}>Enter Your Password</label>
          <input type="password" name="password" placeholder=":/" onChange={e => this.handleChange(e)}/>
          <Button onClick={e => this.submitChange(e)}title="delete"/>
        </form>
      </div>
    )
  }
}
