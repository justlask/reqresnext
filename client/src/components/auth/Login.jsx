import React, { useState, useEffect } from 'react';
import AuthService from './AuthService';
import Button from '../Button'
import { Link } from 'react-router-dom'
import FlashMessage from '../FlashMessage';


const Login = (props) => {
  const service = new AuthService();
  const [user, setUser] = useState({email: null, password: null});
  const [flash, setFlash] = useState(false);
  const [message, setMessage] = useState(null)

  const handleChange = (event) => {  
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    service.login(user.email, user.password)
    .then(response => {
        setUser({ email: "", password: "" });
        props.getUser(response)
        props.history.push('/dashboard')
    })
    .catch(error => {
      handleFlash('email or password is incorrect');
    } )
  }

  const cancelFlash = () => {
    setFlash(!flash)
  }

  const handleFlash = (message) => {
    setFlash(!flash);
    setMessage(message);
    setTimeout(() => cancelFlash(), 4000)
  }

  return(
    <div className="signup">
      <div>
        <h1>Let's get back to work.</h1>
        <p>These projects aren't going to finish themselves.</p>
      </div>
      <form className="signupform">
        <h1>Login</h1>
        <label>Email*</label>
        <input type="email" name="email" value={user.email} onChange={ e => handleChange(e)} required/>
        <label>Password*</label>
        <input type="password" name="password" value={user.password} onChange={ e => handleChange(e)} required/>
        <FlashMessage thestyle='flashemail' show={flash} message={message} />
        <div className="loginbtns">
          <Link to="/forgot">Forgot password?</Link>
          <Button title="login" className="signupbtn" onClick={(e) => handleFormSubmit(e)}/>
        </div>
      </form>
    </div>
  )

}


export default Login;