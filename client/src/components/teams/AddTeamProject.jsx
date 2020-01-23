import React, { Component } from 'react'
import AuthService from '../auth/AuthService'

export default class AddTeamProject extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
  }

  handleOptions = () => {
    return this.props.user.projects.map((project, i) => {
      return (
        <option key={i} value={project._id}>{project.title}</option>
      )
    })
  }

  submitChoice = (e) => {
    e.preventDefault();
    let projectID = this.state.project
    let team = this.props.team._id

    console.log('project    ' + this.state.project)
    console.log('team    ' + team)

    this.service.addProjectToTeam(team, projectID)
    .then(response => {
      console.log(response)
      this.props.updateUser();
      this.props.hide();
    })

  }

  handleCancel = e => {
    e.preventDefault();
    this.props.hide();
  }

  handleSelect = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
  
  render() {
    if (this.props.show) {
      return (
        <div className="inviteform">
          <form>
          <label>Add Existing Project</label><br></br>
            <select defaultValue="no-value" name="project" onChange={e => this.handleSelect(e)}>
            <option value='no-value' disabled>Select one</option>
              {this.handleOptions()}
            </select>
            <input type="submit" value="submit" onClick={(e) => this.submitChoice(e)}/>
            <input style={{backgroundColor: 'inherit', color: '#0C0C3E', border: 'none'}}type="submit" value="cancel" onClick={(e) => this.handleCancel(e)} />
          </form>
        </div>
      )
    }
    else {
      return null
    }
  }
}
