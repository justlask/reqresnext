import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'

export default class TaskCard extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      popOut: 'popouthidden'
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

  render() {
    return (
      <div className="atask" key={this.props.task._id}>
      <div>
        <p onClick={this.showPopout}>{this.props.task.title}</p>
        <div className={this.state.popOut}>
          <p> ---> hidden content</p>
          <p>{this.props.task._id}</p>
        </div>
      </div>
       <Button title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '16px' }}icon={faCheck} />}></Button>
    </div>
    )
  }
}
