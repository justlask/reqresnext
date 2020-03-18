import React, { useState } from 'react'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import FlashMessage from '../FlashMessage'

const AddTaskComment = (props) => {
  const service = new AuthService();
  const [comment, setComment] = useState({description: null});
  const [flash, setFlash] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
  }

  const handleFlash = (message) => {
    setMessage(message);
    setFlash(!flash);
    setTimeout(()=>{
      setFlash(false);
      setMessage(null)
    }, 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    (comment.description && comment.description.length > 0) ? (
      service.addTaskComment(props.project, props.action, props.task, comment)
      .then(response => {
        setComment({description: ''})
        props.commentAdded(response);
      })
    ) : handleFlash("comment cannot be empty")
  }

  return (
    <div>
      <form className="commentform">
        <input onChange={e => handleChange(e)} value={comment.description} name="description" type="text" placeholder="add note..."/>
        <Button onClick={e => handleSubmit(e)} title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '16px' }} icon={faPlus} />}></Button>
      </form>
      <FlashMessage show={flash} message={message} thestyle="flashemail"/>
    </div>
  )


}

export default AddTaskComment
