import React, { useState, useEffect } from 'react'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import AddTaskComment from './AddTaskComment';
import TaskComment from './TaskComment'

const TaskCard = (props) => {
  const service = new AuthService();
  const [popOut, setPopOut] = useState('popouthidden')
  const [isDone, setIsDone] = useState(props.task.complete)
  const [comments, setComments] = useState([])

  useEffect(()=>{
    console.log(props.task)
    service.getComments(props.task._id)
    .then(response => {
      setComments(response)
    })
  },[])

  const showPopout = () => {
    (popOut === 'popouthidden') ? setPopOut('popout') : setPopOut('popouthidden')
  }

  const handleDone = () => {
    (isDone) ? (
      service.incompleteTask(props.task._id)
      .then(response =>{
        setIsDone(false);
        props.taskDone(props.task.type);
      })
    ) : (
      service.completeTask(props.task._id)
      .then(response => {
        setIsDone(true);
        props.taskDone(props.task.type);
      })
    )

  }
  
  const commentAdded = (response) => {
    setComments(response)
  }

  const loadComments = () => {
    return (comments && comments.length > 0) ? (
      comments.map((comment,i) => {
        return (
          <TaskComment comment={comment}/>
        )
      })
    ) : null
  }

  const handleDoneButton = () => {
    return (props.task.complete) ? (
      <Button onClick={e => handleDone()} title={<FontAwesomeIcon style={{color: 'white', fontSize: '16px' }}icon={faCheck} />}></Button>
    ) : <Button onClick={e => handleDone()}></Button>
  }

    return (
      <div className={(isDone) ? 'ataskdone' : 'atask'} key={props.task._id}>
        <div className="buttontitle">
          {handleDoneButton()}
          <p style={{paddingTop: '5px'}}onClick={showPopout}>{props.task.title}</p>
        </div>
        <div>
          <div className={popOut}>
            {loadComments()}
            <div className="commentformbox">
              <AddTaskComment project={props.project} action={props.action} task={props.task._id} commentAdded={commentAdded} />
            </div>
          </div>
        </div>
    </div>
    )

}

export default TaskCard