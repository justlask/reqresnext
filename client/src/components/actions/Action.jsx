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
      popOut: 'popouthidden',
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
  }

  getFrontEnd = () => {

  }

  getBackEnd = () => {

  }

  getBugs = () => {

  }


  taskDone = () => {
    this.loadTasks();
  }




  loadTasks = () => {
    if (this.state.action.tasks) {
      return this.state.action.tasks.map((task, i) => {
        return (
          <TaskCard project={this.props.match.params.projectID} action={this.props.match.params.actionID} taskDone={this.taskDone} task={task} key={task._id} index={i} />
        )
      })
    }
  }

  updateTasks = (response) => {
    this.setState({
      action: response
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
            <div className="tasksbuttons">
              <Button title="Front-End"></Button>
              <Button title="Back-End"></Button>
              <Button title="Bugs"></Button>
            </div>
            <div className="tasks">
              <AddTask action={this.state.action._id} updateTasks={this.updateTasks} />
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
