import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import ActionModal from '../actions/ActionModal'
import ProjectAction from './ProjectAction'
import EditProjectModal from './EditProjectModal'
import MoreProjectOptions from './MoreProjectOptions'


export default class Project extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      isOpen: false,
      project: {},
      members: [],
      actions: [],
      isEdit: false,
      moreOptions: false,
    }
  }

  updateProject = (newProject) => {
    let projectID = this.props.match.params.id
    this.service.getProject(projectID)
    .then(data => {
      this.setState({
        project: data,
        members: data.members,
        actions: data.actions,
      })
    })
  }

  componentDidMount() {
    let projectID = this.props.match.params.id
    this.service.getProject(projectID)
    .then(data => {
      this.setState({
        project: data,
        members: data.members,
        actions: data.actions,
        isEdit: false
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
          <ProjectAction projectName={this.state.project.title} members={this.state.members} projectID={this.props.match.params.id} elem={elem} key={i} i={i}/>
        )
      })
    )
  }

  loadProject = () => {
    return (
      <div className="projbox">
        <div className="alignleft">
          <h3>{this.state.project.title}</h3>
          <p>{this.state.project.description}</p>
        </div>
        <div className="actions">
        <Button className="addproj" onClick={() => this.toggleModal()} title="add action" />
          {this.showActions()}
        </div>
      </div>
    )
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit
    })
  }


  showMoreOptions = () => {
    this.setState({
      moreOptions: !this.state.moreOptions
    })
  }
  
  deleteProject = () => {
    let projectID = this.state.project._id

    this.service.deleteProject(projectID)
    .then(response => {
      this.props.history.push(`/dashboard`)
    })

  }

  markComplete = () => {
    this.service.markProjectComplete(this.state.project._id)
    .then(response => {
      this.updateProject();
      this.showMoreOptions();
    })
  }

  markIncomplete = () => {
    this.service.markProjectIncomplete(this.state.project._id)
    .then(response => {
      this.updateProject();
      this.showMoreOptions();
    })
  }

  

  render() {
    if (this.props.user) {
      return (
        <main className="">
          <div className="icons">
            <Link to="/dashboard"><FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faChevronLeft} /><sub>Dashboard</sub></Link>

            <div>
              <Button className="viewMore" title={<FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faEllipsisH} />} onClick={e => this.showMoreOptions(e)}></Button>
              <MoreProjectOptions markComplete={this.markComplete} markIncomplete={this.markIncomplete} project={this.state.project} toggleEdit={this.toggleEdit} deleteProject={e => this.deleteProject(e)} show={this.state.moreOptions}/>
            </div>
          </div>
    
            {this.loadProject()}
          <ActionModal updateProject={this.updateProject} project={this.state.project} show={this.state.isOpen} onClose={this.toggleModal}> /></ActionModal>
          <EditProjectModal updateProject={this.updateProject} project={this.state.project} show={this.state.isEdit} onClose={this.toggleEdit}></EditProjectModal>
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
