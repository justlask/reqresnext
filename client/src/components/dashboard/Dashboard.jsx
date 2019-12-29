import React, { Component } from 'react'
import { Redirect } from 'react-router-dom' 

export default class Dashboard extends Component {
  render() {
    if (this.props.user) {
      return (
        <main>
          suppppp you're logged in....
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
