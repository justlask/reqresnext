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
    let actionID = this.props.match.params.id

    console.log(actionID)



  }



  render() {
    return (
      <div>
        
      </div>
    )
  }
}
