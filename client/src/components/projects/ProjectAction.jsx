import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

export default class ProjectAction extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      color: ''
    }
  }

  componentDidMount() {
    let bgColor
    if (this.props.i % 2 === 1) {
      bgColor = '#eeeeee'
    }
    else {
      bgColor = '#f7f7f7'
    }

    this.setState({
      color: bgColor
    })
  }

  handleStatusBar = (elem) => {
    let total = 0;
    let completed = 0;
    let percent

    if (elem.tasks.length === 0) {
      percent = 0
    }
    if (elem.complete) {
      percent = 100
    }
    else if (elem.complete === false && elem.tasks.length > 0) {
      elem.tasks.forEach(elem => {

        if (elem.complete === true) return completed +=1
        else return total +=1
      })
      percent = ((completed)/(completed+total))*100
    }
    return (
          <span style={{width: percent + '%'}}></span>
    )
  }

  render() {
    return (
      <div className="projectbox" style={{backgroundColor: this.state.color}}>
        <div style={{backgroundColor: this.state.color}}>
        <Link to={`/project/${this.props.projectID}/${this.props.elem._id}`}><img src={this.props.elem.image} alt=""/></Link>
        <div className="secondaryproject">
          <h3><Link to={`/project/${this.props.projectID}/${this.props.elem._id}`}>{this.props.elem.title}</Link></h3>
          <div className="meter">
            {this.handleStatusBar(this.props.elem)}
          </div>
          <div className="smallimg">
            <img className="" src={this.props.members[0].image} alt=""/>
          </div>
        </div>
        </div>
      </div>
    )
  }
}
