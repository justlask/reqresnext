import React, { Component } from 'react'
import Button from '../Button'
import CreateTeam from './CreateTeam'
import AuthService from '../auth/AuthService';

export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
    this.state = {
      startTeam: false,
      editTeam: false,
    }
  }

  handleShowCreate = () => {
    console.log('sup from show create')
    this.setState({
      startTeam: !this.state.startTeam
    })
  }
  render() {
    return (
      <div className="teams">
        <div className="teambox">
            <Button className="teambtn" title="create a team" onClick={e => this.handleShowCreate(e)}></Button>
            <CreateTeam teams={this.props.teams} show={this.state.startTeam} hide={this.handleShowCreate} updateUser={this.props.updateUser} />
        </div>
      </div>
    )
  }
}
