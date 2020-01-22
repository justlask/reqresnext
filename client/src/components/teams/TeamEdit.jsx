import React, { Component } from 'react'
import Button from '../Button'
import TeamMemberInvite from './TeamMemberInvite'
import AddTeamProject from './AddTeamProject'


export default class TeamEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false,
      projectShowMore: false
    }
  }

  getTeamMembers = () => {
    return (
      this.props.team.members.map((member, i) => {
        return (
        <div className="teamuser" key={i}>
          <img src={member.image} />
          <p>{member.name}</p>
        </div>
        )
      })
    )
  }

  handleInvites = () => {
    if (this.props.team.invites.length > 0) {
      return (
        this.props.team.invites.map((invited, i) => {
          return (
          <div className="teamuser" key={i}>
            <p>{invited.email}</p>
          </div>
          )
        })
      )
    }
    else {
      return (
        <div className="teamuser">
        <p>no pending invites</p>
      </div>
      )
    }
  }

  handleProjects = () => {
    if (this.props.team.projects.length > 0) {
      return (
        this.props.team.projects.map((project, i) => {
          return (
          <div className="teamuser" key={i}>
            <p>{project.name}</p>
          </div>
          )
        })
      )
    }
    else {
      return (
        <div className="teamuser">
          <p>no projects yet</p>
        </div>
      )
    }
  }

  handleShow = () => {
    this.setState({showMore: !this.state.showMore})
  }

  handleInviteButton = () => {
    if (this.state.showMore) {
      return null
    }
    else {
      return <Button className="teambtn" title="invite member" onClick={this.handleShow}></Button>
    }
  }


  handleAddExistingProject = () => {
    if (this.state.projectShowMore) {
      return null
    }
    else {
      return <Button className="teambtn" title="add existing project" onClick={this.handleShowProject}></Button>
    }
  }

  handleShowProject = () => {
    this.setState({projectShowMore: !this.state.projectShowMore})
  }

  render() {
    if (this.props.show) {
      return (
        <div className="teamedit">
          <br></br>
          <b>Admin:</b>
          <div className="teamuser">
            <img src={this.props.team.admin.image} />
            <p>{this.props.team.admin.name}</p>
          </div>
          <br></br>
          <div>
            <b>Members:</b>
            {this.getTeamMembers()}
          </div>
          <div>
            <br></br>
            <b>Projects:</b>
            {this.handleProjects()}
            <AddTeamProject user={this.props.user} team={this.props.team} show={this.state.projectShowMore} hide={this.handleShowProject}/>
            {this.handleAddExistingProject()}
          </div>
          <div>
            <br></br>
            <b>Pending Invites:</b>
            {this.handleInvites()}
            <TeamMemberInvite team={this.props.team} show={this.state.showMore} hide={this.handleShow} />
            {this.handleInviteButton()}
          </div>
        </div>
      )
    }
    else {
      return null
    }
  }
}
