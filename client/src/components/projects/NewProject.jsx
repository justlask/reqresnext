import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class NewProject extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(this.props.user) {
      return (
        <main>
          this is a new project
        </main>
      )
    }
    else {
      return (
        <Redirect to="/" />
      )
    }
  }
}
