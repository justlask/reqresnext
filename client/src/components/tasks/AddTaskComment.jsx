import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'

export default class TaskComment extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      description: ''
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let projectID = this.props.project
    let actionID = this.props.action
    let taskID = this.props.task

    console.log(this.props)


    this.service.addTaskComment(projectID, actionID, taskID, this.state)
    .then(response => {
        console.log(response)
        this.props.commentAdded();
    })
  }


  render() {
    return (
      <form className="commentform">
        <input onChange={e => this.handleChange(e)} value={this.state.description} name="description" type="text" placeholder="add note..."/>
        <Button onClick={e => this.handleSubmit(e)} title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '16px' }} icon={faPlus} />}></Button>
      </form>
    )
  }
}
