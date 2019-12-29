import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <header>
        <div id="name">
          <p>( req, res, next )</p>
        </div>
        <nav>
          <Link title="Signup" to="/signup">Signup</Link>
          <Link title="Login" to="/login">Login</Link>
        </nav>
      </header>
    )
  }
}
