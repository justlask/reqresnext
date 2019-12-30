import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom' 
import Button from '../Button'
import AuthService from '../auth/AuthService'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
    this.state = {
      user: {},
      teams: [],
      projects: []
    }
  }

  componentDidMount() {
    this.service.getUserInfo()
    .then(data => {
      this.setState({
        user: data,
        teams: data.teams,
        projects: data.projects
      })
    }) 
  }

  handleStatusBar = (proj) => {
    let completed = 0
    let total = 0
    proj.actions.forEach(elem => {
      if (elem[0].complete === true) return completed +=1
      else return total +=1
    })

    let percent = ((completed)/(completed+total))*100

    return (
        <div className="meter">
          <span style={{width: percent + '%'}}></span>
        </div>
    )
  }


  showMembers = (proj) => {
    return proj.members.map((elem, i) => {
      console.log(elem)

      if (i < 2) {
        return (
          <img src={elem.image} />
        )
      }
      return (
      <p>+{proj.members.length-2}</p>
      )
    })
  }

  showProjects = () => {
    return this.state.projects.map((project, i) => {
      return (
        <div className="projectbox" key={i}>
          <div>
            <img src={project.image} alt=""/>
            <div className="secondaryproject">
              <h3>{project.title}</h3>
              {this.handleStatusBar(project)}
            </div>
          </div>
          <div className="smallimg">
              {this.showMembers(project)}
          </div>
        </div>
      )
    })
  }


  render() {
    if (this.props.user) {
      return (
        <main>
          <div className="account">
            <Link to="/editaccount">Edit Account</Link>
          </div>
          <div className="flexrow">
            <div className="usercard">
              <img src={this.state.user.image} alt="profile"/>
              <h2>{this.state.user.name}</h2>
              <h3>{this.state.user.position}</h3>
              <ul>
                Teams
                {this.state.teams.map(team => {
                return <li>{team.name}</li>
                })}
              </ul>
              <div className="projectbuttons">
                <Button title="Current Projects" onClick={this.handleProjects}/>
                <Button title="Past Projects" onClick={this.handleProjects} />
              </div>
            </div>
            <div className="projects">
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
