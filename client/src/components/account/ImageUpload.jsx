import React, { Component } from 'react'
import AuthService from '../auth/AuthService'

export default class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      user: '',
      image: ''
    }
  }

  componentDidMount(){
    this.setState({
      image: this.props.image,
    })
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    this.service.handleUpload(uploadData)
    .then(response => {
      console.log(response)
        this.props.updateAccount(response);
        this.setState({ user: response,
        image: response.image });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }


  render() {
    return (
      <label HTMLfor="image" className="userimgbox">
        <input type="file" name="image" id="image" style={{display: 'none'}} onChange={e => this.handleFileUpload(e)}/>
        <span>update</span>
        <img src={this.props.image}/>
      </label>
    )
  }
}
