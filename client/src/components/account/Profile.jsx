import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../auth/AuthService';
import Button from '../Button';
import ImageUpload from './ImageUpload';
import UserCard from './UserCard';
import UserEdit from './UserEdit';
import UserDelete from './UserDelete'
import MoreUserOptions from './MoreUserOptions'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      user: {},
      image: '',
      update: false,
      delete: false,
      moreOptions: false,
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.service.getUserInfo(this.props.loggedInUser.id)
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
    this.service.getUserInfo(this.state.user.id)
    .then(user => {
      this.setState({
        user: user,
        image: user.image
      })
    })
  }

  handleEdit = () => {
    this.setState({
      update: !this.state.update,
    })
    this.showMoreOptions();
  }

  updateUser = () => {
    this.service.getUserInfo(this.state.user.id)
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
    if (this.state.delete) {
      return (
        <UserDelete user={this.state.user} updateUser={this.updateUser} />
      )
    }
    else {
      return (
        <UserCard user={this.state.user}/>
      )
    }
  }

  showMoreOptions = () => {
    this.setState({
      moreOptions: !this.state.moreOptions
    })
  }

  deleteAccount = () => {
    this.setState({
      delete: !this.state.delete
    })
    this.showMoreOptions();
  }

  render() {
      return (
        <main className="accountpage">
          <div className="accountInfo">
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <Button className="editaccount" title={<FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faEllipsisH} />} onClick={e => this.showMoreOptions(e)}></Button>
              <MoreUserOptions toggleEdit={this.handleEdit} deleteAccount={this.deleteAccount} show={this.state.moreOptions}/>
            </div>
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
