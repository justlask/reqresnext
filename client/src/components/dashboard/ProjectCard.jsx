import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'

const ProjectCard = (props) => {
  const service = new AuthService();
  const [percent, setPercent] = useState(0)
  const [color, setColor] = useState(null)

  useEffect(() => {
    service.calculatePercent(props.project._id)
    .then(response => {
      (props.i % 2 === 1) ? setColor('#eeeeee') : setColor('#f7f7f7')
      setPercent(response)
    })
  }, [])

  // const showMembers = (proj) => {
  //   return (proj.members) ? (
  //   <div style={{display: 'flex'}}>
  //     <img src={proj.members[0].image} alt=""/> 
  //     <p>+{proj.members.length-2}</p>
  //   </div>
  //   ) : null
  // }

  const handleStatusBar = (proj) => {
    return (
      <div className="meter">
        <span style={{width: percent + '%'}}></span>
      </div>
    )
  }

  return (
    <div className="projectbox" style={{backgroundColor: color}}>
      <div style={{backgroundColor: color}}>
        <Link to={`/project/${props.project._id}`}><img src={props.project.image} alt=""/></Link>
        <div className="secondaryproject">
          <h3><Link to={`/project/${props.project._id}`}>{props.project.title}</Link></h3>
          {handleStatusBar(props.project._id)}
          <div className="smallimg">
            {/* {showMembers(props.project)} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard