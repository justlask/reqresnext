import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import TeamCard from './TeamCard'

export default class CreateTeam extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
  }

  componentDidMount() {
    console.log(this.props)
  }

  submitNewTeam = (e) =>{
    e.preventDefault();
    console.log(this.state)
    this.service.createTeam(this.state)
    .then(response => {
      console.log(response)
      this.props.updateUser();
      this.props.hide();
    })
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  showTeams = (e) => {
    return this.props.teams.map((team, i) => {
      console.log(team)
      return (
          <TeamCard user={this.props.user} team={team} key={i} />
      )
    })
  }

  render() {
    if (this.props.show) {
      return (
        <div className="createform">
          <form className="teamform">
            <label>Team Name</label>
            <input type="text" name="name" placeholder="what are you going to call your team?" onChange={e => this.handleChange(e)}/>
            <input type="submit" value="create my team!" onClick={e => this.submitNewTeam(e)}/>
          </form>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Your Teams:</h1>
          {this.showTeams()}
        </div>
      )
    }
  }
}
