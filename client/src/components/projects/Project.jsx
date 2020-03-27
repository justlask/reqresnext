import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import ActionModal from '../actions/ActionModal'
import ProjectAction from './ProjectAction'
import EditProjectModal from './EditProjectModal'
import MoreProjectOptions from './MoreProjectOptions'

const Project = (props) => {
  const service = new AuthService();
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [moreOptions, setMoreOptions] = useState(false)
  const [project, setProject] = useState({})

  useEffect(() => {
    let projectID = props.match.params.id
    service.getProject(projectID)
      .then(data => {
        setProject(data)
      })
  },[])


  const updateProject = (newProject) => {
    let projectID = props.match.params.id
    service.getProject(projectID)
    .then(data => {
      setProject(data)
    })
  }

  const showMembers = () => {
    return ( project.members.map((elem, i) => {
      return <img src={elem.image} alt="profile"/>
    })
    )
  }

  const showActions = () => {
    return (project.actions && project.actions.length > 0) ? (
      project.actions.map((elem,i) => {
        return (
          <ProjectAction projectName={project.title} members={project.members} projectID={props.match.params.id} elem={elem} key={i} i={i}/>
        )
      })
    ) : <p>No Actions Yet</p>
  }

  const loadProject = () => {
    return (
      <div className="projbox">
        <div className="alignleft">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="actions">
        <Button className="addproj" onClick={() => toggleModal()} title="add action" />
          {showActions()}
        </div>
      </div>
    )
  }


  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const toggleEdit = () => {
    setIsEdit(!isEdit)
  }

  const showMoreOptions = () => {
    setMoreOptions(!moreOptions)
  }
  
  const deleteProject = () => {
    let projectID = project._id

    service.deleteProject(projectID)
    .then(response => {
      props.history.push(`/dashboard`)
    })
  }


  const markComplete = () => {
    service.markProjectComplete(project._id)
    .then(response => {
      updateProject();
      showMoreOptions();
    })
  }

  const markIncomplete = () => {
    service.markProjectIncomplete(project._id)
    .then(response => {
      updateProject();
      showMoreOptions();
    })
  }

  return (
    <main className="">
      <div className="icons">
        <Link to="/dashboard"><FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faChevronLeft} /><sub>Dashboard</sub></Link>

        <div>
          <Button className="viewMore" title={<FontAwesomeIcon style={{color: '#0C0C3E' }}icon={faEllipsisH} />} onClick={e => showMoreOptions(e)}></Button>
          <MoreProjectOptions markComplete={markComplete} markIncomplete={markIncomplete} project={project} toggleEdit={toggleEdit} deleteProject={e => deleteProject(e)} show={moreOptions}/>
        </div>
      </div>
      <div className="projects">

      {loadProject()}
      </div>
      <ActionModal updateProject={updateProject} project={project} show={isOpen} onClose={toggleModal}> /></ActionModal>
      <EditProjectModal updateProject={updateProject} project={project} show={isEdit} onClose={toggleEdit}></EditProjectModal>
    </main>
  )

}

export default Project