import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import FlashMessage from '../FlashMessage'

export default class addTask extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      title: '',
      flash: false,
      message: ''
    }
  }

  addTask = (e) => {
    e.preventDefault();
    if (this.state.type) {
      this.service.addTask(this.props.action, this.state)
      .then(response => {
        this.setState({
          title: '',
        })
        this.props.updateTasks(response);
      })
    }
    else {
      this.handleFlash('must pick a type from the select options')
    }
  }

  handleSelect = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleFlash = (message) => {
    this.setState({
      flash: !this.state.flash,
      message: message
    })
    setTimeout(() => this.cancelFlash(), 2000)
  }

  cancelFlash = () => {
    this.setState({
      flash: !this.state.flash
    })
  }


  render() {
    return (
      <div>
        <form className="addtask">
        <select name="type" id="type" onChange={e => this.handleSelect(e)} required>
          <option selected="true" disabled="true">select one</option>
          <option value="front-end">front-end</option>
          <option value="back-end">back-end</option>
          <option value="bug">bug</option>
        </select>
        <input type="text" name="title" placeholder="add a task" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
        <Button onClick={e => this.addTask(e)} title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '20px' }} icon={faPlus} />}></Button>
      </form>
      <FlashMessage thestyle="flashmessage" show={this.state.flash} message={this.state.message} />
      </div>
    )
  }
}
