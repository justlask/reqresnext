import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthService from '../components/auth/AuthService'
import Button from './Button'

const Navbar = (props) => {
  const service = new AuthService();
  const [user, setUser] = useState(null)

  useEffect(()=>{
    setUser(props.user)
  },[props.user])

  const logout = () => {
    service.logout()
    .then(data => {
      setUser(null);
      props.logoutUser();
      props.updateUser(null);
    })
  }

  return (user) ? (
    <header>
      <div id="name">
        <NavLink to="/"><p>( req, res, next )</p></NavLink>
      </div>
      <nav>
        <NavLink to="/dashboard" activeClassName='is-active'>Dashboard</NavLink>
        <NavLink to="/account" activeClassName="is-active">Account</NavLink>
        <Link to="/"><Button className="noButton" onClick={logout} title="Logout"></Button></Link>
      </nav>
    </header>
  ) : (
    <header>
      <div id="name">
        <NavLink to="/"><p>( req, res, next )</p></NavLink>
      </div>
      <nav>
        <NavLink activeClassName="is-active" title="About" to="/about">About</NavLink>
        <NavLink activeClassName='is-active' title="Signup" to="/signup">Signup</NavLink>
        <NavLink activeClassName='is-active' title="Login" to="/login">Login</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
