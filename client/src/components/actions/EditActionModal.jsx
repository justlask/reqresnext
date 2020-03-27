import React, { useState } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to edit an action

const EditActionModal = (props) => {
  const service = new AuthService();
  const [action, setAction] = useState({title: props.action.title, description: props.action.description});
  const [image, setImage] = useState(props.action.image)

  const handleChange = (event) => {
    setAction({
      ...action,
      [event.target.name]: event.target.value
    })
  }

  const updateAction = (event) => {
    let actionID = props.action._id
    event.preventDefault();

    service.updateAction(actionID, action, image)
    .then(response => {
      props.loadAction();
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

  const cancelEdit = () => {
    setAction({title: props.action.title, description: props.action.description});
    setImage(props.action.image)
    props.onClose();
  }

  const createForm = () => {
    return (
      <form className="actionform">
        <div className="modalnames">
          <h3>Edit This Action</h3>
        </div>
        <label>Action Image</label>
        <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => handleFileUpload(e)} />
        <label>Action Title</label>
        <input type="text" name="title" placeholder={props.action.title} value={action.title} defaultValue={props.action.title} onChange={e => handleChange(e)}/>
        <label>Action Description</label>
        <input type="text" name="description" placeholder={props.action.description} value={action.description} defaultValue={props.action.description} onChange={e => handleChange(e)}/>
      </form>
    )
  }

  return (!props.show) ? null : (
    <div className="backdrop">
      <div className="modal">
      {createForm()}
        <div className="addactionmodal">
          <Button className="noButtonBlue" title="cancel" onClick={e => cancelEdit(e)}></Button>
          <Button className="addactionmodalbtn" title="save" onClick={e => {updateAction(e)}}></Button>
        </div>
      </div>
    </div>
  )

}

export default EditActionModal
