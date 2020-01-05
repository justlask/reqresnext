import React, { Component } from 'react'
import AuthService from '../auth/AuthService'

export default class UserCard extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
  }

  render() {
    return (
      <div>
        <h1>{this.props.user.name}</h1>
        <h2 style={{fontWeight: 'normal', fontSize: '20px'}}>{this.props.user.position}</h2>
      </div>
    )
  }
}
