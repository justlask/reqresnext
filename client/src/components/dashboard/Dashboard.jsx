import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom' 
import Button from '../Button'

export default class Dashboard extends Component {
  render() {
    if (this.props.user) {
      return (
        <main>
          <div>
            <Link to="/editaccount">Edit Account</Link>
          </div>
          <div className="flexrow">
            <div>
              user card
            </div>
            <div>
              projects
            </div>
          </div>
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
