import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom' 
import Button from '../Button'
import AuthService from '../auth/AuthService'
import Project from '../dashboard/Project'

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
    }
  }

  componentDidMount() {
    
    this.service.getUserInfo()
    .then(data => {
      this.setState({
        user: data,
        teams: data.teams,
      })
    }) 
      this.handleCurrent();
  }


  showProjects = () => {
    return this.state.projects.map((project, i) => {
      return (
        <Project project={project} key={i+1} i={i}/>
      )
    })
  }

  handleCurrent = (e) => {
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

  handlePast = (e) => {
    let userID = this.props.user._id
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
    let userID = this.props.user._id
    let select = id

    this.service.getProjectsByTeam(select, userID)
    .then(data => {
      this.setState({
        projects: data
      })
    });
  }


  render() {
    if (this.props.user) {
      return (
        <main className="padding">
          <div className="flexrow">
            <div className="usercard">
              <img src={this.state.user.image} alt="profile"/>
              <h2>{this.state.user.name}</h2>
              <h3>{this.state.user.position}</h3>
              <ul>
                Teams
                {this.state.teams.map(team => {
                return <li onClick={(e) => {this.handleTeam(team._id) }}>{team.name}</li>
                })}
              </ul>
              {/* <div className="projectbuttons">
                <Button className={this.state.activeButtons.current} title="Current Projects" onClick={(e) => this.handleCurrent(e)}/>
                <Button className={this.state.activeButtons.past} title="Past Projects" onClick={(e) => this.handlePast(e)} />
              </div> */}
            </div>
            <div className="projects">
              <div className="projectbuttons">
                  <Button className={this.state.activeButtons.current} title="Current Projects" onClick={(e) => this.handleCurrent(e)}/>
                  <Button className={this.state.activeButtons.past} title="Past Projects" onClick={(e) => this.handlePast(e)} />
                {/* <Button className={this.state.activeButtons.frontEnd} onClick={e => this.getFrontEnd()} title="Front-End"></Button>
                <Button className={this.state.activeButtons.backEnd} onClick={e => this.getBackEnd()} title="Back-End"></Button> */}
              </div>
              {this.showProjects()}
            </div>
          </div>
        </main>
      )
    }
    else {
      return (
        <Redirect to="/" />
      )
    }
  }
}
