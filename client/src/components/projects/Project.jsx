import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default class Project extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      project: {},
      members: [],
      actions: []
    }
  }

  componentDidMount() {
    let projectID = this.props.match.params.id
    this.service.getProject(projectID)
    .then(data => {
      this.setState({
        project: data,
        members: data.members,
        actions: data.actions
      })
    })
  }

  showMembers = () => {
    return this.state.members.map((elem, i) => {
      return <img src={elem.image} alt="profile"/>
    })
  }

  showActions = () => {
    console.log(this.state.project)
    console.log(this.state.actions)

    
    return (
      this.state.actions.map((elem,i) => {
        return (
        <div>
          <h3>{elem[0].title}</h3>
          <img src={elem[0].image} alt=""/>
          {/* {this.handleStatusBar(elem)} */}
        </div>
        )
      })
    )
  }


  loadProject = () => {
    return (
      <div>
        <div className="alignleft">
          <h3>{this.state.project.title}</h3>
          <p>{this.state.project.description}</p>
        </div>
        <div className="actions">
          {this.showActions()}
        </div>
      </div>
    )
  }

  handleStatusBar = (elem) => {
    console.log(elem)

    //need to think about how im going to handle the status
    // bar for tasks completed....

    let completed = 0
    let total = 0

    // elem.tasks.forEach(elem => {
    //   if (elem[0].complete === true) return completed +=1
    //   else return total +=1
    // })

    let percent = ((completed+1)/(completed+total+2))*100

    return (
        <div className="meter">
          <span style={{width: percent + '%'}}></span>
        </div>
    )
  }


  render() {
    return (
      <main>
        <div className="icons">
          <Link to="/dashboard"><FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faChevronLeft} /></Link>
          <div className="smallimg2">
            {this.showMembers()}
          </div>
        </div>
          {this.loadProject()}
      </main>
    )
  }
}
