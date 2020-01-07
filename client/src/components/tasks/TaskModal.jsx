import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to add an action

export default class ActionModal extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      title: '',
      description: '',
    }
  }
      
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    

  createAction = (e) => {
    let projectID = this.props.project._id
    let actionInfo = this.state


    e.preventDefault();

    this.service.createAction(projectID, actionInfo )
    .then(response => {
        this.setState({
          title: '',
          description: ''
        })

      this.props.updateProject();
      this.props.onClose();
    })
  }

  createForm = () => {

    return (
      <form className="actionform">
        <label>Action Name</label>
        <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)}/>
        <label>Action Description</label>
        <input type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
      </form>
    )
  }




  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          <div className="modalnames">
            <h3>{this.props.project.title}</h3>
            <p>{this.props.project.description}</p>
          </div>

         {this.createForm()}

          <div className="addactionmodal">
            <Button className="noButtonBlue" title="cancel" onClick={e => this.props.onClose()}></Button>
            <Button className="addactionmodalbtn" title="create" onClick={e => {this.createAction(e)}}></Button>
          </div>
        </div>
      </div>
    );
  }
}
