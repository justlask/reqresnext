import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import ActionModal from '../actions/ActionModal'


export default class Project extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      isOpen: false,
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
    return (
      this.state.actions.map((elem,i) => {
        return (
        <div>
          <h3>{elem[0].title}</h3>
          <img src={elem[0].image} alt=""/>
          <div className="flexyrow">
            <img className="statusimg" src={this.state.members[0].image} alt=""/>
            <div className="meter2">
              {this.handleStatusBar(elem)}
            </div>
          </div>
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
    let total = 0;
    let completed = 0;

    console.log(elem)
    elem[0].tasks.forEach(elem => {
      if (elem.complete === true) return completed +=1
      else return total +=1
    })
    let percent = ((completed)/(completed+total))*100

    if (completed === 0 & total === 0) {
      return (
        <span style={{width: "0%"}}></span>
  )
    }

    return (
          <span style={{width: percent + '%'}}></span>
    )
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <main className="">
        <div className="icons">
          <Link to="/dashboard"><FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faChevronLeft} /></Link>
          <div className="smallimg2">
            {this.showMembers()}
          </div>
        </div>
          {this.loadProject()}
          <div className="addaction">
            <Button onClick={() => this.toggleModal()} title="add action" />
          </div>
        <ActionModal project={this.state.project} show={this.state.isOpen} onClose={this.toggleModal}> />
        </ActionModal>
      </main>
    )
  }
}
