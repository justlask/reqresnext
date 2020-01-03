import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'

export default class TaskCard extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      popOut: 'popouthidden',
      isDone: false,
      handleDone: 'atask',
      color: '#f7f7f7'
    }
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

  render() {
    if (this.props.task.complete) {
      return (
        <div className='ataskdone' key={this.props.task._id}>
                 <Button onClick={e => this.handleDone()} title={<FontAwesomeIcon style={{color: 'white', fontSize: '16px' }}icon={faCheck} />}></Button>
          <div>
            <p style={{paddingTop: '5px'}}onClick={this.showPopout}>{this.props.task.title}</p>
            <div className={this.state.popOut}>
              <p> ---> hidden content</p>
              <p>{this.props.task._id}</p>
              <div className="commentformbox">
                <form className="commentform">
                  <input type="text" placeholder="add note..."/>
                  <Button title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '16px' }} icon={faPlus} />}></Button>
                </form>
              </div>
            </div>
          </div>
      </div>
      )
    }
    else {
      return (
        <div className={this.state.handleDone} key={this.props.task._id}>
                 <Button onClick={e => this.handleDone()} title={<FontAwesomeIcon style={{color: 'white', fontSize: '16px' }}icon={faCheck} />}></Button>
          <div>
            <p style={{paddingTop: '5px'}}onClick={this.showPopout}>{this.props.task.title}</p>
            <div className={this.state.popOut}>
              <p> ---> hidden content</p>
              <p>{this.props.task._id}</p>
              <div className="commentformbox">
                <form className="commentform">
                  <input type="text" placeholder="add note..."/>
                  <Button title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '16px' }} icon={faPlus} />}></Button>
                </form>
              </div>
            </div>
          </div>
      </div>
      )
    }
  }
}
