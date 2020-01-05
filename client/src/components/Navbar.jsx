import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import AuthService from '../components/auth/AuthService'
import Button from './Button'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
  }



  logout = () => {
    return this.service.logout()
    .then(data => {
        this.setState({ loggedInUser: null });
        this.props.updateUser(null); 
    })
  }

  render() {
    if (this.props.user) {
      return (
        <header>
          <div id="name">
            <NavLink to="/"><p>( req, res, next )</p></NavLink>
          </div>
          <nav>
            <NavLink to="/newproject" activeClassName='is-active'>New Project</NavLink>
            <NavLink to="/dashboard" activeClassName='is-active'>Dashboard</NavLink>
            <NavLink to="/account" activeClassName="is-active">Account</NavLink>
            <Button className="noButton" onClick={this.logout} title="Logout"></Button>
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
