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
      teams: this.props.teams
    }
  }

  componentDidMount() {
    console.log('sup from team')
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
          <h3>Teams</h3>
            <Button className="teambtn" title="create a team" onClick={e => this.handleShowCreate(e)}></Button>
            <CreateTeam show={this.state.startTeam} hide={this.handleShowCreate} />
        </div>
      </div>
    )
  }
}
