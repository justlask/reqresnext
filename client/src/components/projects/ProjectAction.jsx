import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../auth/AuthService'

const ProjectAction = (props) => {
  const service = new AuthService();
  const [color, setColor] = useState(null);

  useEffect(()=>{
    (props.i % 2 === 1) ? setColor('#eeeeee') : setColor('#f7f7f7')
  },[])

  const handleStatusBar = (elem) => {
    let total = 0;
    let completed = 0;
    let percent

    if (elem.tasks.length === 0) {
      percent = 0
    }
    if (elem.complete) {
      percent = 100
    }
    else if (elem.complete === false && elem.tasks.length > 0) {
      elem.tasks.forEach(elem => {

        if (elem.complete === true) return completed +=1
        else return total +=1
      })
      percent = ((completed)/(completed+total))*100
    }
    return (
          <span style={{width: percent + '%'}}></span>
    )
  }

  return (
    <div className="projectbox" style={{backgroundColor: color}}>
      <div style={{backgroundColor: color}}>
      <Link to={`/project/${props.projectID}/${props.elem._id}`}><img src={props.elem.image} alt=""/></Link>
      <div className="secondaryproject">
        <h3><Link to={`/project/${props.projectID}/${props.elem._id}`}>{props.elem.title}</Link></h3>
        <div className="meter">
          {handleStatusBar(props.elem)}
        </div>
        <div className="smallimg">
          <img className="" src={props.members[0].image} alt=""/>
        </div>
      </div>
      </div>
    </div>
  )

}

export default ProjectAction
