import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

export default class EditAccount extends Component {
  constructor(props){ 
    super(props)
    this.service = new AuthService();
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({
      user: this.props.user
    })
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    this.service.handleUpload(uploadData)
    .then(response => {
        this.setState({ image: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data" className="editform">
          
          <div>
            <label for="photo"><b>Profile Picture</b></label><br></br>
            <input type="file" onChange={(e) => this.handleFileUpload(e)} /> 
          </div>
          <div>
          <label><b>Name</b></label><br></br>
          <input type="text" name="name" value={this.props.user.name} onChange={ e => this.handleChangeBio(e)} />
          </div>
          <Button className="submitbtn" name="submit" onClick={e => this.handleFormSubmit()} />
        </form>

          <Button className="submitbtn delete" onClick={this.handleDelete} name="Delete Account" />
    </div>
    )
  }
}
