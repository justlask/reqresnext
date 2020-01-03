import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'

export default class addTask extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      type: null,
    }
  }

  addTask = (e) => {
    e.preventDefault();
    console.log(this.props.action)
    if (this.state.type !== null) {
      this.service.addTask(this.props.action, this.state)
      .then(response => {
        this.props.updateTasks(response);
      })
    }
    else {
      console.log('must pick a type!!!')
    }
  }

  handleSelect = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
    console.log(this.state)
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
    console.log(this.state)
  }


  render() {
    return (
      <form className="addtask">
        <select name="type" id="type" onChange={e => this.handleSelect(e)}>
          <option selected="true" disabled="true">type</option>
          <option value="front-end">front-end</option>
          <option value="back-end">back-end</option>
          <option value="bug">bug</option>
        </select>
        <input type="text" name="title" placeholder="add a task" onChange={(e) => this.handleChange(e)}/>
        <Button onClick={e => this.addTask(e)} title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '20px' }} icon={faPlus} />}></Button>
      </form>
    )
  }
}
