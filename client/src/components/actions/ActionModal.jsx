import React, { useState } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to add an action

const ActionModal = (props) => {
  const service = new AuthService();
  const [action, setAction] = useState({title: null, description: null});
  const [image, setImage] = useState(null)

  const handleChange = (event) => {
    setAction({
      ...action,
      [event.target.name]: event.target.value
    })
  }

  const createAction = (e) => {
    let projectID = props.project._id
    e.preventDefault();

    service.createAction(projectID, action, image)
    .then(response => {
      setAction({title: null, description: null})
      setImage(null)
      props.updateProject();
      props.onClose();
    })
  }

  const handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    service.handleProjectUploadMainImage(uploadData)
    .then(response => {
      console.log(response)
      console.log(response.secure_url)
      setImage(response.secure_url)
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  const createForm = () => {
    return (
      <form className="actionform">
        <div className="modalnames">
          <h3>Add an Action</h3>
        </div>
        <label>Action Image</label>
        <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => handleFileUpload(e)} />
        <label>Action Name</label>
        <input type="text" name="title" value={action.title} onChange={e => handleChange(e)}/>
        <label>Action Description</label>
        <input type="text" name="description" value={action.description} onChange={e => handleChange(e)}/>
      </form>
    )
  }

  const cancelAdd = () => {
    setAction({title: null, description: null})
    setImage(null)
    props.onClose()
  }

  return (!props.show) ? null : (
    <div className="backdrop">
      <div className="modal">
      {createForm()}
        <div className="addactionmodal">
          <Button className="noButtonBlue" title="cancel" onClick={e => cancelAdd(e)}></Button>
          <Button className="addactionmodalbtn" title="create" onClick={e => {createAction(e)}}></Button>
        </div>
      </div>
    </div>
  )
}

export default ActionModal