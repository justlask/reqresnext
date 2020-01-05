import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import Button from '../Button';
import ImageUpload from './ImageUpload';
import UserCard from './UserCard';
import UserEdit from './UserEdit';


export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      user: {},
      image: '',
      update: false
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.service.getUserInfo(this.props.user.id)
    .then(user => {
      this.setState({
        user: user,
        image: user.image
      })
    })
  }

  handleTeams = () => {
    if (this.state.user.teams) {
      return this.state.user.teams.map(team => {
        return (
          <Link to={`/team/${team._id}`}><li>{team.name}</li></Link>
        )
      })
    }
  }

  updateAccount = (response) => {
    this.service.getUserInfo(this.props.user.id)
    .then(user => {
      this.setState({
        user: user,
        image: user.image
      })
    })
  }

  handleEdit = () => {
    this.setState({
      update: true
    })
  }

  updateUser = () => {
    this.service.getUserInfo(this.props.user.id)
    .then(user => {
      this.setState({
        user: user,
        image: user.image,
        update: false
      })
    })
  }

  handleCard = () => {
    if (this.state.update) {
      return (
        <UserEdit user={this.state.user} updateUser={this.updateUser}/>
      )
    }
    else {
      return (
        <UserCard user={this.state.user}/>
      )
    }
  }

  render() {
    return (
      <main className="accountpage">
        <div className="accountInfo">
          <Button className="noButtonBlueThin" title="edit account" onClick={e => this.handleEdit()}></Button>
          <div className="userInfo">
          <ImageUpload image={this.state.image} updateAccount={this.updateAccount}/>
            {this.handleCard()}
          </div>
        </div>
        <div className="teams">
        <h2>Teams</h2>
          <ul>
            {this.handleTeams()}
          </ul>
        </div>
      </main>
    )
  }
}
