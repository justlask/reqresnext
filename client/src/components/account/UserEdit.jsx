import React, { Component } from 'react';
import AuthService from '../auth/AuthService';
import Button from '../Button';

export default class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      name: '',
      position: ''
    }
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      position: this.props.user.position
    })
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  submitChange = (e) => {
    e.preventDefault();
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <form className="editbox">
          <input type="text" name="name" placeholder={this.state.name} defaultValue={this.state.name} onChange={e => this.handleChange(e)}/>
          <input type="text" name="position" placeholder={this.state.position} defaultValue={this.state.position} onChange={e => this.handleChange(e)}/>
          <Button onClick={e => this.submitChange(e)}title="save"/>
        </form>
      </div>
    )
  }
}
