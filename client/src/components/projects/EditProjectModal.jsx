import React, { useState } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to add an action
const EditProjectModal = (props) => {
  const service = new AuthService();
  const [project, setProject] = useState({title: props.project.title, description: props.project.description})
  const [image, setImage] = useState(props.project.image)

  const handleChange = (event) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value
    })
  }

  const updateProject = (event) => {
    let projectID = props.project._id
    event.preventDefault();

    service.updateProject(projectID, project, image)
    .then(response => {
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
  
  const cancelEdit = () => {
    setProject({title: props.project.title, description: props.project.description});
    setImage(props.project.image)
    props.onClose();
  }

  const createForm = () => {
    return (
      <form className="actionform">
        <div className="modalnames">
          <h3>Edit This Project</h3>
        </div>
        <label>Project Main Image</label>
        <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => handleFileUpload(e)} />
        <label>Project Title</label>
        <input type="text" name="title" placeholder={props.project.title} value={project.title} defaultValue={props.project.title} onChange={e => handleChange(e)}/>
        <label>Project Description</label>
        <input type="text" name="description" placeholder={props.project.description} value={project.description} defaultValue={props.project.description} onChange={e => handleChange(e)}/>
      </form>
    )
  }

  return (!props.show) ? null : (
    <div className="backdrop">
      <div className="modal">
      {createForm()}
        <div className="addactionmodal">
          <Button className="noButtonBlue" title="cancel" onClick={e =>cancelEdit(e)}></Button>
          <Button className="addactionmodalbtn" title="save" onClick={e => {updateProject(e)}}></Button>
        </div>
      </div>
    </div>
  )


}

export default EditProjectModal

