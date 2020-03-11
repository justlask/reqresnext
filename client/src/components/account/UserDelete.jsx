import React, { useState } from 'react'
import Button from '../Button'
import AuthService from '../auth/AuthService'

const UserDelete = (props) => {
  const service = new AuthService();
  const [password, setPassword] = useState(null);

  const handleChange = (e) => {
    setPassword(e.target.value)
  }

  const submitChange = (e) => {
    e.preventDefault();
    service.deleteAccount(password)
    .then(response => {
      window.location.reload()
    })
  }

  return (
    <div>
      <h3 style={{fontWeight: 400, textAlign: 'left'}}>Well this is sad, 😔</h3>
      <form className="editbox">
        <label style={{textAlign: 'left'}}>Enter Your Password</label>
        <input type="password" name="password" placeholder=":/" onChange={e => handleChange(e)}/>
        <Button onClick={e => submitChange(e)}title="delete"/>
      </form>
    </div>
  )
}

export default UserDelete;
