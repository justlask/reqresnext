import React, { Component } from 'react'
import TeamEdit from './TeamEdit'

export default class TeamCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false
    }
  }


  showMore = () => {
    this.setState({showMore: !this.state.showMore})
  }


  render() {
    return (
      <div className="teamcard">
        <div className="teamlist" onClick={this.showMore}>
          <h3>{this.props.team.name}</h3>
        </div>
        <div>
          <TeamEdit team={this.props.team} show={this.state.showMore} showMore={this.showMore}/>
        </div>
      </div>
    )
  }
}
