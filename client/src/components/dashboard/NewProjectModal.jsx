import React, { useState } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to add a project
const NewProjectModal = (props) => {
  const service = new AuthService();
  const [project, setProject] = useState({title: null, description: null, image: null, team: null})

  const handleChange = (event) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value
    })
  }

  const createProject = (event) => {
    event.preventDefault();
    console.log(project)

    service.createProject(project)
    .then(response => {
      setProject({title: null, description: null, image: null, team: null})
      props.updateProject();
      props.onClose();
    })
  }

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    service.handleProjectUploadMainImage(uploadData)
    .then(response => {
      setProject({
        ...project,
        image: response.secure_url
      })
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  const handleOptions = () => {
    return props.user.teams.map((team, i) => {
      return (
        <option key={i} value={team._id}>{team.name}</option>
      )
    })
  }

  const createForm = () => {
    return (
      <form className="actionform">
        <div className="modalnames">
          <h3>Add a Project</h3>
        </div>
        <label>Project Main Image</label>
        <input style={{border: 'none'}} type="file" name="image" id="image" onChange={e => handleFileUpload(e)} />
        <label>Project Name</label>
        <input type="text" name="title" value={project.title} onChange={e => handleChange(e)}/>
        <label>Project Description</label>
        <input type="text" name="description" value={project.description} onChange={e => handleChange(e)}/>
        <label>Add This Project To A Team?</label>
        <select defaultValue="no-value" name="team" onChange={e => handleChange(e)}>
          <option value='no-value' disabled>Select one</option>
          {handleOptions()}
        </select>
      </form>
    )
  }

  const cancelCreate = () => {
    setProject({title: null, description: null, team: null, image: null})
    props.onClose();
  }

  return (!props.show) ? null : (
    <div className="backdrop">
      <div className="modal">
       {createForm()}
        <div className="addactionmodal">
          <Button className="noButtonBlue" title="cancel" onClick={e => cancelCreate()}></Button>
          <Button className="addactionmodalbtn" title="create" onClick={e => {createProject(e)}}></Button>
        </div>
      </div>
    </div>
  )

}

export default NewProjectModal