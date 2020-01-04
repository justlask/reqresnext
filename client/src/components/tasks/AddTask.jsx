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
      title: '',
    }
  }

  addTask = (e) => {
    e.preventDefault();
    if (this.state.type !== null) {
      this.service.addTask(this.props.action, this.state)
      .then(response => {
        this.setState({
          title: '',
          type: null
        })
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
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
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
        <input type="text" name="title" placeholder="add a task" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
        <Button onClick={e => this.addTask(e)} title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '20px' }} icon={faPlus} />}></Button>
      </form>
    )
  }
}
