import React, { useState, useEffect } from 'react'
import Button from '../Button'
import AuthService from '../auth/AuthService'
import ProjectCard from './Components/ProjectCard'
import NewProjectModal from './Components/NewProjectModal'
import UserCard from './Components/UserCard'
import ProjectTypeButton from './Components/ProjectTypeButton'

const Dashboard = () => {
  const service = new AuthService();
  const [user, setUser] = useState({})
  const [team, setTeam] = useState(undefined)
  const [type, setType] = useState('Current Projects')
  const [teams, setTeams] = useState([])
  const [projects, setProjects] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    service.getUserInfo()
    .then(userData => {

      service.getProjectsByTeam(type, team)
      .then(response => {
        setUser(userData)
        setTeams(userData.teams)
        setProjects(response)
      })
    });
  }, [type, team])


  const showProjects = () => {
    return (projects.length > 0) ? (
    projects.map((project, i) => {
      return <ProjectCard project={project} key={i+1} i={i} />
    })
    ) : <p>No Projects to Show.</p>
  }


  const handleProjects = (props) => {
    if (team) {
      console.log(props)
      console.log(team._id)
    }
    else {
      console.log(props)
      console.log(team)
    }
  }

  const updateProject = () => {
    let userID = user._id
    let select = false
    
    service.getProjects(select, userID)
    .then(data => {
      setProjects(data)
    });
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <main className="padding">
      <div className="flexrow">
        <UserCard user={user} team={team} setTeam={setTeam} teams={teams} />
        <div className="projects">
          <div className="projectNav">
            <Button onClick={() => toggleModal()} className="addproj" title="Add Project"></Button>
            <div className="projectbuttons">
              <ProjectTypeButton type="Current Projects" handleProjects={handleProjects} setType={setType} isActive={type}/>
              <ProjectTypeButton type="Past Projects" handleProjects={handleProjects} setType={setType} isActive={type}/>
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