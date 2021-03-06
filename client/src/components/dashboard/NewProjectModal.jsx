import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to add a project

export default class NewProjectModal extends Component {
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
    

  createProject = (e) => {
    e.preventDefault();

    let projectInfo = {
      title: this.state.title,
      description: this.state.description,
    }

    if (this.state.image) {
      projectInfo.image = this.state.image
    }

    if (this.state.team) {
      projectInfo.team = this.state.team
    }


    this.service.createProject(projectInfo)
    .then(response => {
      this.setState({
        title: '',
        description: '',
        image: '',
      })
      this.props.updateProject();
      this.props.onClose();
    })
  }


  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    this.service.handleProjectUploadMainImage(uploadData)
    .then(response => {
        this.setState({
          image: response.secure_url
        })
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }


  handleImage = e => {
    this.setState({
      image: e.target.files[0]
    })
  }

  handleOptions = () => {
    return this.props.user.teams.map((team, i) => {
      return (
        <option key={i} value={team._id}>{team.name}</option>
      )
    })
  }

  createForm = () => {
    return (
      <form className="actionform">
        <div className="modalnames">
          <h3>Add a Project</h3>
        </div>
        <label>Project Main Image</label>
        <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => this.handleFileUpload(e)} />
        <label>Project Name</label>
        <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)}/>
        <label>Project Description</label>
        <input type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
        <label>Add This Project To A Team?</label>
        <select defaultValue="no-value" name="team" onChange={e => this.handleChange(e)}>
          <option value='no-value' disabled>Select one</option>
          {this.handleOptions()}
        </select>
      </form>
    )
  }

  cancelCreate = () => {
    this.setState({
      title: '',
      description: '',
      team: '',
      image: ''
    })
    this.props.onClose();
  }

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
         {this.createForm()}
          <div className="addactionmodal">
            <Button className="noButtonBlue" title="cancel" onClick={e => this.cancelCreate()}></Button>
            <Button className="addactionmodalbtn" title="create" onClick={e => {this.createProject(e)}}></Button>
          </div>
        </div>
      </div>
    );
  }
}
