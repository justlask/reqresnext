import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'
import Button from '../Button'
import EditAccount from './EditAccount'
import ImageUpload from './ImageUpload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      user: {},
      image: '',
      update: {updateName: false, updatePosition: false}
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
    console.log('you gots a new image dawg')
    this.service.getUserInfo(this.props.user.id)
    .then(user => {
      this.setState({
        user: user,
        image: user.image
      })
    })
  }

  updateName = () => {
    this.setState({
      update: {
        updateName: true
      }
    })
  }

  updatePosition = () => {
    this.setState({
      update: {
        updatePosition: true
      }
    })
  }

  showName = () => {
    if (this.state.update.updateName) {
      return (
        <form className="editbox">
          <input type="text" name="name" placeholder={this.state.user.name}/>
          <Button title="save"/>
        </form>
      )
    }
    else {
      return <h1 className="editme" onClick={this.updateName}>{this.state.user.name}</h1>
    } 
  }

  showPosition = () => {
    if (this.state.update.updatePosition) {
      return (
        <form className="editbox">
          <input type="text" name="position" placeholder={this.state.user.position}/>
          <Button title="save"/>
        </form>
      )
    }
    else {
      return <h2 className="editme" onClick={this.updatePosition}>{this.state.user.position}</h2>
    }
  }
  // <label for="photo"><b>Profile Picture</b></label><br></br>
  // <input type="file" onChange={(e) => this.handleFileUpload(e)} /> 


  render() {
    return (
      <main className="accountpage">
        <div className="userInfo">
          <ImageUpload image={this.state.image} updateAccount={this.updateAccount}/>
          <div>
          {this.showName()}
          {this.showPosition()}
          </div>
        </div>
        <div className="flexcol">
        <h2>Teams</h2>
          <ul>
            {this.handleTeams()}
          </ul>
        </div>
      </main>
    )
  }
}
