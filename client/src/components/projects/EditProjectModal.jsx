import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to add an action

export default class EditProjectModal extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      title: '',
      description: '',
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.project.title,
      description: this.props.project.description
    })
  }
      
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    

  updateProject = (e) => {

    let projectID = this.props.project._id

    let projectInfo = {
      title: this.state.title,
      description: this.state.description,
    }

    let image

    if (this.state.image) {
      image = this.state.image
    }

    e.preventDefault();

    this.service.updateProject(projectID, projectInfo, image)
    .then(response => {
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
      console.log(response)
      console.log(response.secure_url)
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
    console.log(this.state.image)
  }

  createForm = () => {

    return (
      <form className="actionform">
        <div className="modalnames">
          <h3>Edit This Project</h3>
        </div>
        <label>Project Main Image</label>
        <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => this.handleFileUpload(e)} />
        <label>Project Title</label>
        <input type="text" name="title" placeholder={this.props.project.title} value={this.state.title} defaultValue={this.props.project.title} onChange={e => this.handleChange(e)}/>
        <label>Project Description</label>
        <input type="text" name="description" placeholder={this.props.project.description} value={this.state.description} defaultValue={this.props.project.description} onChange={e => this.handleChange(e)}/>
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
         {this.createForm()}
          <div className="addactionmodal">
            <Button className="noButtonBlue" title="cancel" onClick={e => this.props.onClose()}></Button>
            <Button className="addactionmodalbtn" title="save" onClick={e => {this.updateProject(e)}}></Button>
          </div>
        </div>
      </div>
    );
  }
}

