import React, { Component } from 'react'
import Button from '../Button'
import TeamMemberInvite from './TeamMemberInvite'

export default class TeamEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false
    }
  }

  getTeamMembers = () => {
    return (
      this.props.team.members.map((member, i) => {
        return (
        <div className="teamuser">
          <img src={member.image} />
          <p>{member.name}</p>
        </div>
        )
      })
    )
  }

  handleShow = () => {
    this.setState({showMore: !this.state.showMore})
  }

  render() {
    if (this.props.show) {
      return (
        <div className="teamedit">
          <p><b>Admin:</b> {this.props.team.admin.name}</p>
          <div>
            <b>Members:</b>
            {this.getTeamMembers()}
          </div>
          <TeamMemberInvite teamID={this.props.team.id} show={this.state.showMore} hide={this.handleShow} />
          <Button className="teambtn" title="invite member" onClick={this.handleShow}></Button>
        </div>
      )
    }
    else {
      return null
    }
  }
}
