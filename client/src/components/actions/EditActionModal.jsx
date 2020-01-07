import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to edit an action

export default class EditActionModal extends Component {
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
      title: this.props.action.title,
      description: this.props.action.description
    })
  }
      
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    

  updateAction = (e) => {

    let actionID = this.props.action._id

    let actionInfo = {
      title: this.state.title,
      description: this.state.description,
    }

    let image

    if (this.state.image) {
      image = this.state.image
    }

    e.preventDefault();

    this.service.updateAction(actionID, actionInfo, image)
    .then(response => {

      this.props.loadAction();
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
          <h3>Edit Action</h3>
        </div>
        <label>Action Image</label>
        <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => this.handleFileUpload(e)} />
        <label>Action Title</label>
        <input type="text" name="title" placeholder={this.props.action.title} value={this.state.title} defaultValue={this.props.action.title} onChange={e => this.handleChange(e)}/>
        <label>Action Description</label>
        <input type="text" name="description" placeholder={this.props.action.description} value={this.state.description} defaultValue={this.props.action.description} onChange={e => this.handleChange(e)}/>
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
            <Button className="addactionmodalbtn" title="save" onClick={e => {this.updateAction(e)}}></Button>
          </div>
        </div>
      </div>
    );
  }
}

