import React, { useState, useEffect } from 'react';
import AuthService from './AuthService';
import Button from '../Button'
import FlashMessage from '../FlashMessage'

const Signup = (props) => {
  const service = new AuthService();
  const [user, setUser] = useState({name: null, email: null, password: null});
  const [flash, setFlash] = useState(false);
  const [message, setMessage] = useState(undefined);

  const handleChange = (event) => {  
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  const cancelFlash = () => {
    setFlash(false);
  }

  const handleFlash = (message) => {
    setFlash(true);
    setMessage(message)
    setTimeout(() => cancelFlash(), 4000)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (user.email && user.email.includes('@' && '.')) {
      service.signup(user.name, user.email, user.password)
      .then(response => {
          setUser({name: null, email: null, password: null});
          props.getUser(response)
          props.history.push('/dashboard')
      })
      .catch(error => console.log(error) )
    }
    else {
      handleFlash('email must be a valid email');
    }
  }

  return(
    <div className="signup">
      <div>
        <h1>Let's get started.</h1>
        <p>These projects aren't going to start and organize themselves.</p>
      </div>
      <form className="signupform">
        <h1>Signup</h1>
        <label>Name*</label>
        <input type="text" name="name" value={user.name} onChange={ e => handleChange(e)} required/>
        <label>Email*</label>
        <input type="email" name="email" value={user.email} onChange={ e => handleChange(e)} required/>
        <label>Password*</label>
        <input type="password" name="password" value={user.password} onChange={ e => handleChange(e)} required />
        <FlashMessage thestyle='flashemail' show={flash} message={message} />
        <Button title="join" className="signupbtn" onClick={handleFormSubmit}/>
      </form>
    </div>
  )

}

export default Signup;