import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'
import Button from '../Button'
import EditAccount from './EditAccount'
import ImageUpload from './ImageUpload'

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
    console.log(this.state.user.name)
    this.setState({
      update: {
        updateName: true
      }
    })
  }

  handleUpdate = () => {
    
  }

  showName = () => {
    if (this.state.update.updateName) {
      return <input type="text" name="name" placeholder={this.state.user.name}/>
    }
    else {
      return <h1 onClick={this.updateName}>{this.state.user.name}</h1>
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
          <h2 onClick={this.updatePosition}>{this.state.user.position}</h2>
          </div>
          <ul>
            Teams
            {this.handleTeams()}
          </ul>
        </div>
        <div>
          <Button title="edit" onClick={e => this.loadEdit()}></Button>
        </div>
      </main>
    )
  }
}
