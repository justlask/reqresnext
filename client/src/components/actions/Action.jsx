import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import TaskCard from '../tasks/TaskCard'
import AddTask from '../tasks/AddTask'
import EditActionModal from './EditActionModal'

export default class Action extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      action: {},
      tasks: [],
      popOut: 'popouthidden',
      type: 'front-end',
      activeButtons: {frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'},
      project: '',
      isOpen: false
    }
  }

  componentDidMount() {
    let projectID = this.props.match.params.projectID
    let actionID = this.props.match.params.actionID
    
    this.service.getAction(actionID)
    .then(response => {
      this.setState({
        action: response,
        project: response.project.title
      })
    })

    this.service.getTasks(actionID, 'front-end')
    .then(response => {
      this.setState({
        tasks: response,
        activeButtons: {frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'},
      })
    })
  }

  loadAction = () => {
    let projectID = this.props.match.params.projectID
    let actionID = this.props.match.params.actionID

    this.service.getAction(actionID)
    .then(response => {
      this.setState({
        action: response,
        project: response.project.title
      })
    })

    this.service.getTasks(actionID, 'front-end')
    .then(response => {
      this.setState({
        tasks: response,
        activeButtons: {frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'},
      })
    })
  }

  getFrontEnd = () => {
    this.service.getTasks(this.props.match.params.actionID, 'front-end')
    .then(response => {
      this.setState({
        tasks: response,
        activeButtons: {frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'},
      })
    })
  }

  getBackEnd = () => {
    this.service.getTasks(this.props.match.params.actionID, 'back-end')
    .then(response => {
      this.setState({
        tasks: response,
        activeButtons: {frontEnd: 'notActiveActionButton', backEnd: 'activeActionButton', bugs: 'notActiveActionButton'},
      })
    })
  }

  getBugs = () => {
    this.service.getTasks(this.props.match.params.actionID, 'bug')
    .then(response => {
      this.setState({
        tasks: response,
        activeButtons: {frontEnd: 'notActiveActionButton', backEnd: 'notActiveActionButton', bugs: 'activeActionButton'},
      })
    })
  }


  taskDone = () => {
    let actionID = this.props.match.params.actionID

    this.service.getTasks(actionID, 'front-end')
    .then(response => {
      this.setState({
        tasks: response,
        activeButtons: {frontEnd: 'activeActionButton', backEnd: 'notActiveActionButton', bugs: 'notActiveActionButton'},
      })
    })
  }


  loadTasks = () => {
    if (this.state.tasks) {
      return this.state.tasks.map((task, i) => {
        return (
          <TaskCard project={this.props.match.params.projectID} action={this.props.match.params.actionID} taskDone={this.taskDone} task={task} key={task._id} index={i} />
        )
      })
    }
  }

  updateTasks = (response) => {
    this.setState({
      tasks: response
    })
  }


  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  // handleButton = () => {
  //   if (this.props.elem.complete) {
  //     return (
  //       <Button className="completedBtn" onClick={e => this.markAsIncomplete()} title={<FontAwesomeIcon style={{color: 'white', fontSize: '16px' }}icon={faCheck} />}></Button>
  //     )
  //   }
  //   else {
  //     return (
  //       <Button className="notCompletedBtn" onClick={e => this.markAsComplete()} title=""></Button>
  //     )
  //   }
  // }


  // markAsComplete = () => {
  //   console.log("it's completed")
  //   this.props.elem.complete = true
  // }

  // markAsIncomplete = () => {
  //   console.log("it's incomplete")
  //   this.props.elem.complete = false
  // }


  handleCompleteButton = () => {
    console.log(this.state.action.complete)
  }
  render() {
    if (this.props.user) {
      return (
        <main className="actionpage">
            <div className="icons">
              <Link to={`/project/${this.props.match.params.projectID}`}><FontAwesomeIcon className="chevron" style={{color: '#0C0C3E' }}icon={faChevronLeft} /><sub>{this.state.project}</sub></Link>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button className="addproj" title="Edit this action" onClick={e => this.toggleModal(e)}></Button>
                <Button className="addproj" title="Mark action as complete" onClick={e => this.handleCompleteButton(e)}></Button>
              </div>
            </div>
            <div className="title">
              <h3>{this.state.action.title}</h3>
              <p>{this.state.action.description}</p>
            </div>
          <div className="flexrow2">
            <img src={this.state.action.image} alt=""/>
            <div className="tasksform">
              <AddTask action={this.state.action._id} updateTasks={this.updateTasks} />
              <div className="tasksbuttons">
                <Button className={this.state.activeButtons.frontEnd} onClick={e => this.getFrontEnd()} title="Front-End"></Button>
                <Button className={this.state.activeButtons.backEnd + " center"} onClick={e => this.getBackEnd()} title="Back-End"></Button>
                <Button className={this.state.activeButtons.bugs} onClick={e => this.getBugs()} title="Bugs"></Button>
              </div>
              <div className="tasks">
                <div className="thetasks">
                  {this.loadTasks()}
                </div>
              </div>
            </div>
          </div>
          <EditActionModal loadAction={this.loadAction} action={this.state.action} show={this.state.isOpen} onClose={this.toggleModal}> /></EditActionModal>
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
