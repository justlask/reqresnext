import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'

export default class Project extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      percent: 0,
      color: ''
    }
  }

  componentDidMount() {
    this.service.calculatePercent(this.props.project._id)
    .then(response => {
      let bgColor
      console.log(this.props.i)
      if (this.props.i % 2 === 1) {
        bgColor = '#eeeeee'
      }
      else {
        bgColor = '#f7f7f7'
      }

      this.setState({
        percent: response,
        color: bgColor
      })
    })
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

  handleStatusBar = (proj) => {
    return (
      <div className="meter">
        <span style={{width: this.state.percent + '%'}}></span>
      </div>
      )
  }




  render() {
    return (
      <div className="projectbox" style={{backgroundColor: this.state.color}}>
      <div style={{backgroundColor: this.state.color}}>
        <Link to={`/project/${this.props.project._id}`}><img src={this.props.project.image} alt=""/></Link>
        <div className="secondaryproject">
          <h3><Link to={`/project/${this.props.project._id}`}>{this.props.project.title}</Link></h3>
          {this.handleStatusBar(this.props.project._id)}
          <div className="smallimg">
            {this.showMembers(this.props.project)}
          </div>
        </div>
      </div>
    </div>
    )
  }
}
