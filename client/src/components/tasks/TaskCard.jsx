import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import AddTaskComment from './AddTaskComment';
import TaskComment from './TaskComment'

export default class TaskCard extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      popOut: 'popouthidden',
      isDone: false,
      handleDone: 'atask',
      color: '#f7f7f7',
      commentAdded: false,
      comments: []
    }
  }

  componentDidMount() {
    //get the comments for the task card
    this.service.getComments(this.props.task._id)
    .then(response => {
      this.setState({
        comments: response
      })
    })
    // console.log(this.state.comments)
  }

  showPopout = () => {
    if (this.state.popOut === 'popouthidden') {
      this.setState({
        popOut: 'popout'
      })
    }
    else {
      this.setState({
        popOut: 'popouthidden'
      })
    }
  }

  handleDone = () => {
    this.service.completeTask(this.props.task._id)
    .then(response => {
      this.setState({
        isDone: true,
        handleDone: 'ataskdone'
      })
      this.props.taskDone();
    })
  }

  commentAdded = (response) => {
    this.setState({
      comments: response
    })

  }

  loadComments = () => {
    if (this.state.comments.length !== 0) {
      return this.state.comments.map((comment,i) => {
        return (
          <TaskComment comment={comment}/>
        )
      })
    }
  }

  render() {
    if (this.props.task.complete) {
      return (
        <div className='ataskdone' key={this.props.task._id}>
          <div className="buttontitle">
            <Button onClick={e => this.handleDone()} title={<FontAwesomeIcon style={{color: 'white', fontSize: '16px' }}icon={faCheck} />}></Button>
            <p style={{paddingTop: '5px'}} onClick={this.showPopout}>{this.props.task.title}</p>
          </div>
          <div>
            <div className={this.state.popOut}>
              {this.loadComments()}
              <div className="commentformbox">
                <AddTaskComment project={this.props.project} action={this.props.action} task={this.props.task._id} commentAdded={this.commentAdded} />
              </div>
            </div>
          </div>
      </div>
      )
    }
    else {
      return (
        <div className={this.state.handleDone} key={this.props.task._id}>
          <div className="buttontitle">
            <Button onClick={e => this.handleDone()}></Button>
            <p style={{paddingTop: '5px'}}onClick={this.showPopout}>{this.props.task.title}</p>
          </div>
          <div>
            <div className={this.state.popOut}>
              {this.loadComments()}
              <div className="commentformbox">
                <AddTaskComment project={this.props.project} action={this.props.action} task={this.props.task._id} commentAdded={this.commentAdded} />
              </div>
            </div>
          </div>
      </div>
      )
    }
  }
}
