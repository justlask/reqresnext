import React, { useState, useEffect } from 'react';
import AuthService from '../auth/AuthService';
import Button from '../Button';


const UserEdit = (props) => {
  const service = new AuthService();
  const [user, setUser] = useState({name: props.user.name, position: props.user.position, email: props.user.email, password: undefined})

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const submitChange = (e) => {
    e.preventDefault();
    service.updateAccount(user)
    .then(user => {
      props.updateUser();
    })
  }
  
  return (
    <div>
      <form className="editbox">
        <label style={{textAlign: 'left'}}>Name</label>
        <input type="text" name="name" placeholder={user.name} defaultValue={user.name} onChange={e => handleChange(e)}/>
        <label style={{textAlign: 'left'}}>Position</label>
        <input type="text" name="position" placeholder={user.position} defaultValue={user.position} onChange={e => handleChange(e)}/>
        <label style={{textAlign: 'left'}}>Email</label>
        <input type="text" name="email" placeholder={user.email} defaultValue={user.email} onChange={e => handleChange(e)}/>
        <label style={{textAlign: 'left'}}>New Password</label>
        <input type="password" name="password" placeholder="enter new password..." onChange={e => handleChange(e)}/>
        <Button onClick={e => submitChange(e)}title="save"/>
      </form>
    </div>
  )

}

export default UserEdit
