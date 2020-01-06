import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to add an action

export default class NewProjectModal extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      title: '',
      description: '',
      image: '',
    }
  }
      
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
    console.log(this.state)
  }
    

  createProject = (e) => {
    let projectInfo = {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image
    }
    e.preventDefault();


    this.service.createProject(projectInfo)
    .then(response => {
      this.setState({
        title: '',
        description: '',
        image: '',
      })
      console.log(response)
      this.props.updateProject();
      this.props.onClose();
    })

    // this.handleFileUpload()
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



  // handleFileUpload = e => {
  //   console.log("The file to be uploaded is: ", this.state.image);

  //   const uploadData = new FormData();
  //   uploadData.append("image", this.state.image);
    
  //   this.service.handleProjectUploadMainImage(uploadData)
  //   .then(response => {
  //     console.log(response)
  //       // this.props.updateAccount(response);
  //       // this.setState({ user: response,
  //       // image: response.image });
  //     })
  //     .catch(err => {
  //       console.log("Error while uploading the file: ", err);
  //     });
  // }

  handleImage = e => {
    this.setState({
      image: e.target.files[0]
    })
    console.log(this.state.image)
  }

  createForm = () => {

    return (
      <form className="actionform">
        <label>Project Name</label>
        <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)}/>
        <label>Project Description</label>
        <input type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
        <label>Project Main Image</label>
        <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => this.handleFileUpload(e)} />
        {/* <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => this.handleImage(e)} /> */}
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
            <h3>Add A Project</h3>
          </div>

         {this.createForm()}

          <div className="addactionmodal">
            <Button className="noButtonBlue" title="cancel" onClick={e => this.props.onClose()}></Button>
            <Button className="addactionmodalbtn" title="create" onClick={e => {this.createProject(e)}}></Button>
          </div>
        </div>
      </div>
    );
  }
}
