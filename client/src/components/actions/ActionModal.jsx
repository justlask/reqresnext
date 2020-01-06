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
    let image


    if (this.state.image) {
      image = this.state.image
    }

    e.preventDefault();

    this.service.createAction(projectID, actionInfo, image )
    .then(response => {
        console.log(response)
        this.setState({
          title: '',
          description: '',
          image: ''
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
          <h3>Add an Action</h3>
        </div>
        <label>Project Main Image</label>
        <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => this.handleFileUpload(e)} />
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
