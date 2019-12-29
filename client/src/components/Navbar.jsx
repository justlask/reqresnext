import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
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
