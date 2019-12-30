import React, { Component } from 'react'
import AuthService from '../auth/AuthService'

export default class Project extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
  }

  componentDidMount() {
    console.log(this.props.match.params)
  }

  render() {
    return (
      <main>
        whatuppppppp project
      </main>
    )
  }
}
