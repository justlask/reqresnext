import React, { useState, useEffect } from 'react'
import Button from '../Button'
import AuthService from '../auth/AuthService'
import ProjectCard from '../dashboard/ProjectCard'
import NewProjectModal from '../dashboard/NewProjectModal'

const Dashboard = (props) => {
  const service = new AuthService();
  const [user, setUser] = useState({})
  const [teams, setTeams] = useState([])
  const [projects, setProjects] = useState([])
  const [activeButtons, setActiveButtons] = useState({current: 'activeActionButton', past: 'notActiveActionButton'})
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    service.getUserInfo()
    .then(userData => {
      let userID = userData._id
      let select = false

      service.getProjects(select, userID)
      .then(projectData => {
        setActiveButtons({
          current: 'activeActionButton',
          past: 'notActiveActionButton',
        })
        setUser(userData)
        setTeams(userData.teams)
        setProjects(projectData)
    })
    });
  }, [])

  const clearProjects = () => {
    setProjects([])
  }

  const showProjects = () => {
    return (projects.length > 0) ? (
    projects.map((project, i) => {
      return <ProjectCard project={project} key={i+1} i={i} />
    })
    ) : <p>No Projects to Show.</p>
  }

  const handleCurrent = (e) => {
    clearProjects();
    let userID = user._id
    let select = false
    service.getProjects(select, userID)
    .then(data => {
      setActiveButtons({
        current: 'activeActionButton',
        past: 'notActiveActionButton',
      })
      setProjects(data)
    });
  }

  const handlePast = (e) => {
    clearProjects();
    let userID = user._id
    let select = true

    service.getProjects(select, userID)
    .then(data => {
      setActiveButtons({
        current: 'notActiveActionButton',
        past: 'activeActionButton',
      });
      setProjects(data)
    });
  }

  const handleTeam = (id) => {
    clearProjects();
    service.getProjectsByTeam(id)
    .then(data => {
      setProjects(data)
      showProjects()
    });
  }

  const handleTeams = () => {
    if (teams.length > 0) {
      return (
        <ul>
          Teams
          {teams.map((team, i) => {
            return <li key={i} onClick={(e) => {handleTeam(team._id)}}>{team.name}</li>
          })}
        </ul>
      )
    }
  }

  const updateProject = () => {
    let userID = user._id
    let select = false
    
    service.getProjects(select, userID)
    .then(data => {
      setActiveButtons({
        current: 'activeActionButton',
        past: 'notActiveActionButton',
      })
      setProjects(data)
    });
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <main className="padding">
      <div className="flexrow">
        <div className="usercard">
          <img src={user.image} alt="profile"/>
          <h2>{user.name}</h2>
          <h3>{user.position}</h3>
          {handleTeams()}
        </div>
        <div className="projects">
          <div className="projectNav">
            <Button onClick={() => toggleModal()} className="addproj" title="Add Project"></Button>
            <div className="projectbuttons">
              <Button className={activeButtons.current} title="Current Projects" onClick={(e) => handleCurrent(e)}/>
              <Button className={activeButtons.past} title="Past Projects" onClick={(e) => handlePast(e)} />
            </div>
          </div>
          {showProjects()}
        </div>
      </div>
      <NewProjectModal user={user} updateProject={updateProject} show={isOpen} onClose={toggleModal}> /></NewProjectModal>
    </main>
  )
}

export default Dashboard