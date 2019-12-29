import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthService from '../components/auth/AuthService'

export default class Navbar extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    if (this.props.user) {
      return (
        <header>
          <div id="name">
            <NavLink to="/"><p>( req, res, next )</p></NavLink>
          </div>
          <nav>
            <NavLink activeClassName='is-active' title="Signup" to="/signup">Signup</NavLink>
            <NavLink activeClassName='is-active' title="Login" to="/login">Login</NavLink>
            <NavLink to="/logout">Logout</NavLink>
          </nav>
        </header>
      )
    }
    else {
      return (
        <header>
          <div id="name">
            <NavLink to="/"><p>( req, res, next )</p></NavLink>
          </div>
          <nav>
            <NavLink activeClassName='is-active' title="Signup" to="/signup">Signup</NavLink>
            <NavLink activeClassName='is-active' title="Login" to="/login">Login</NavLink>
          </nav>
        </header>
      )
    }
  }
}
