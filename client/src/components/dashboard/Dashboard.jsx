import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom' 
import Button from '../Button'
import AuthService from '../auth/AuthService'
import ProjectCard from '../dashboard/ProjectCard'
import NewProjectModal from '../dashboard/NewProjectModal'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
    this.state = {
      user: {},
      teams: [],
      projects: [],
      actions: [],
      activeButtons: {current: 'activeActionButton', past: 'notActiveActionButton'},
      isOpen: false
    }
  }

  componentDidMount() {
    
    this.service.getUserInfo()
    .then(data => {
      this.setState({
        user: data,
        teams: data.teams,
      })
      this.handleCurrent();
    }) 
  }


  showProjects = () => {
    return this.state.projects.map((project, i) => {
      return (
        <ProjectCard project={project} key={i+1} i={i}/>
      )
    })
  }

  handleCurrent = (e) => {
    let userID = this.state.user._id
    let select = false

    this.service.getProjects(select, userID)
    .then(data => {
      this.setState({
        activeButtons: {
          current: 'activeActionButton',
          past: 'notActiveActionButton',
        },
        projects: data
      })
    });
  }

  handlePast = (e) => {
    let userID = this.state.user._id
    let select = true

    this.service.getProjects(select, userID)
    .then(data => {
      this.setState({
        activeButtons: {
          current: 'notActiveActionButton',
          past: 'activeActionButton',
        },
        projects: data
      })
    });
  }

  handleTeam = (id) => {
    let userID = this.state._id
    let select = id

    this.service.getProjectsByTeam(select, userID)
    .then(data => {
      this.setState({
        projects: data
      })
    });
  }

  handleTeams = () => {
    if (this.state.teams.length > 0) {
      return (
        <ul>
          Teams
          {this.state.teams.map(team => {
            return <li onClick={(e) => {this.handleTeam(team._id) }}>{team.name}</li>
          })}
        </ul>
      )
    }
  }

  updateProject = () => {
    let userID = this.props.user._id
    let select = false
    
    this.service.getProjects(select, userID)
    .then(data => {
      this.setState({
        activeButtons: {
          current: 'activeActionButton',
          past: 'notActiveActionButton',
        },
        projects: data
      })
    });
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
      return (
        <main className="padding">
          <div className="flexrow">
            <div className="usercard">
              <img src={this.state.user.image} alt="profile"/>
              <h2>{this.state.user.name}</h2>
              <h3>{this.state.user.position}</h3>
              {this.handleTeams()}
            </div>
            <div className="projects">
              <div className="projectNav">
                <Button onClick={() => this.toggleModal()} className="addproj" title="Add Project"></Button>
                <div className="projectbuttons">
                  <Button className={this.state.activeButtons.current} title="Current Projects" onClick={(e) => this.handleCurrent(e)}/>
                  <Button className={this.state.activeButtons.past} title="Past Projects" onClick={(e) => this.handlePast(e)} />
                </div>
              </div>
              {this.showProjects()}
            </div>
          </div>
          <NewProjectModal updateProject={this.updateProject} show={this.state.isOpen} onClose={this.toggleModal}> /></NewProjectModal>
        </main>
      )
  }
}
