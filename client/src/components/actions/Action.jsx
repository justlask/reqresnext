import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import TaskCard from '../tasks/TaskCard'

export default class Action extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      action: {},
      popOut: 'popouthidden'
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



  loadTasks = () => {
    console.log(this.state.action.tasks)
    if (this.state.action.tasks) {
      return this.state.action.tasks.map((task, i) => {
        return (
          <TaskCard task={task} key={task._id} index={i} />
        )
      })
    }
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
              <div className="addtask">
                <input type="text" placeholder="add a task" />
                <Button title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '20px' }} icon={faPlus} />}></Button>
              </div>
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
