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
      projects: [],
      activeButtons: {current: 'activeButton', past: 'notActiveButton'},
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
      if (i < 2) {
        return (
          <img src={elem.image} />
        )}

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
            <Link to={`/project/${project._id}`}><img src={project.image} alt=""/></Link>
            <div className="secondaryproject">
              <h3><Link to={`/project/${project._id}`}>{project.title}</Link></h3>
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

  handleCurrent = (e) => {
    let userID = this.props.user._id
    let select = false

    this.service.getProjects(select, userID)
    .then(data => {
      this.setState({
        activeButtons: {
          current: 'activeButton',
          past: 'notActiveButton',
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
          current: 'notActiveButton',
          past: 'activeButton',
        },
        projects: data
      })
    });
  }

  handleTeam = (id) => {
    let userID = this.props.user._id
    let select = id
    console.log(select)

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
                return <li onClick={(e) => {this.handleTeam(team._id) }}>{team.name}</li>
                })}
              </ul>
              <div className="projectbuttons">
                <Button className={this.state.activeButtons.current} title="Current Projects" onClick={(e) => this.handleCurrent(e)}/>
                <Button className={this.state.activeButtons.past} title="Past Projects" onClick={(e) => this.handlePast(e)} />
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
