import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import TaskCard from '../tasks/TaskCard'
import AddTask from '../tasks/AddTask'

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
    }
  }

  componentDidMount() {
    let projectID = this.props.match.params.projectID
    let actionID = this.props.match.params.actionID

    this.service.getAction(actionID)
    .then(response => {
      this.setState({
        action: response
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
    this.loadTasks();
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


  render() {
    return (
      <main className="actionpage">
          <div className="icons">
            <Link to={`/project/${this.props.match.params.projectID}`}><FontAwesomeIcon className="chevron" style={{color: '#0C0C3E' }}icon={faChevronLeft} /></Link>
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
              <Button className={this.state.activeButtons.backEnd} onClick={e => this.getBackEnd()} title="Back-End"></Button>
              <Button className={this.state.activeButtons.bugs} onClick={e => this.getBugs()} title="Bugs"></Button>
            </div>
            <div className="tasks">
              <div className="thetasks">
                {this.loadTasks()}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
