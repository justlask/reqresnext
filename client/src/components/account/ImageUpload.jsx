import React, { useState, useEffect } from 'react'
import AuthService from '../auth/AuthService'

const ImageUpload = (props) => {
  const service = new AuthService();
  const [user, setUser] = useState();
  const [image, setImage] = useState(props.image);

  const handleFileUpload = (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append('image', e.target.files[0]);

    service.handleUpload(uploadData)
    .then(response => {
      console.log(response)
      props.updateAccount(response);
      setUser(response);
      setImage(response.image);
    })
    .catch(err => {
      console.log('Error while uploading the file: ', err)
    })
  }

  return (
    <label HTMLfor="image" className="userimgbox">
      <input type="file" name="image" id="image" style={{display: 'none'}} onChange={e => handleFileUpload(e)}/>
      <span>update</span>
      <img src={image}/>
    </label>
  )
}

export default ImageUpload;