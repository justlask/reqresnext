import React, { Component } from 'react';
import AuthService from '../auth/AuthService';
import Button from '../Button';

export default class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      name: '',
      position: '',
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      position: this.props.user.position,
      email: this.props.user.email,
    })
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  submitChange = (e) => {
    e.preventDefault();
      this.service.updateAccount(this.state)
      .then(user => {
        this.props.updateUser()
      })
  }

  render() {
    return (
      <div>
        <form className="editbox">
          <label style={{textAlign: 'left'}}>Name</label>
          <input type="text" name="name" placeholder={this.state.name} defaultValue={this.state.name} onChange={e => this.handleChange(e)}/>
          <label style={{textAlign: 'left'}}>Position</label>
          <input type="text" name="position" placeholder={this.state.position} defaultValue={this.state.position} onChange={e => this.handleChange(e)}/>
          <label style={{textAlign: 'left'}}>Email</label>
          <input type="text" name="email" placeholder={this.state.email} defaultValue={this.state.email} onChange={e => this.handleChange(e)}/>
          <label style={{textAlign: 'left'}}>New Password</label>
          <input type="password" name="password" placeholder="enter new password..." onChange={e => this.handleChange(e)}/>
          <Button onClick={e => this.submitChange(e)}title="save"/>
        </form>
      </div>
    )
  }
}
