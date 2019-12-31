import React, { Component } from 'react'
import AuthService from '../auth/AuthService'

export default class Action extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      action: {}
    }
  }


  componentDidMount() {
    let projectID = this.props.match.params.projectID
    let actionID = this.props.match.params.actionID

    console.log(actionID)
    console.log(projectID)
  }



  render() {
    return (
      <main>
        <h3>BITCH LETS DO THIS ACTION</h3>
        <p>{this.props.match.params.projectID}</p>
        <p>{this.props.match.params.actionID}</p>
      </main>
    )
  }
}
