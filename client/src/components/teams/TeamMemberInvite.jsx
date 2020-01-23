import React, { Component } from 'react'
import AuthService from '../auth/AuthService';
import FlashMessage from '../FlashMessage';

export default class TeamMemberInvite extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      sent: false
    }
  }

  sendInvite = e => {
    e.preventDefault();
    if (this.state.email.includes('@') && this.state.email.includes(".")) {
      this.service.sendInvite(this.props.team, this.state.email)
      .then(response => {
        console.log(response)
        this.props.updateUser()
        this.props.hide();
      })
    }
    else {
      console.log('its gotta be an email')
    }
  }

  handleChange = e => {
    this.setState({email: e.target.value})
    console.log(this.state)
  }

  handleCancel = e => {
    e.preventDefault();
    this.props.hide();
  }

  render() {
    if (this.props.show && !this.state.sent) {
      return (
        <div className="inviteform">
          <form>
          <label>Send An Invite</label><br></br>
            <input type="email" placeholder="enter their email" onChange={e => this.handleChange(e)}/>
            <input type="submit" value="send it!" onClick={e => this.sendInvite(e)}/>
            <input style={{backgroundColor: 'inherit', color: '#0C0C3E', border: 'none'}}type="submit" value="cancel" onClick={(e) => this.handleCancel(e)} />
          </form>
        </div>
      )
    }
    if (!this.props.show && this.state.sent) {
      return (
        <div>SENT!</div>
      )
    }
    else {
      return null
    }
  }
}
