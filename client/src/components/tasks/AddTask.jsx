import React, { useState } from 'react'
import AuthService from '../auth/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button'
import FlashMessage from '../FlashMessage'

const AddTask = (props) => {
  const service = new AuthService();
  const [flash, setFlash] = useState(false)
  const [message, setMessage] = useState(null)
  const [task, setTask] = useState({type: null, title: null})

  const handleSelect = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const addTask = (e) => {
    e.preventDefault();
    (task.type && task.title && task.title !== '') ? (
      service.addTask(props.action, task)
      .then(response => {
        setTask({type: undefined, title: ''});
        props.updateTasks(response)
      })
    ) : handleFlash('must pick a type from the select options')
  }

  const handleFlash = (message) => {
    setFlash(!flash);
    setMessage(message)
    setTimeout(() => {
      setFlash(false)
    }, 2000)
  }

  return (
    <div>
      <form className="addtask">
        <select name="type" id="type" onChange={e => handleSelect(e)} required>
          <option selected="true" disabled="true">select one</option>
          <option value="front-end">front-end</option>
          <option value="back-end">back-end</option>
          <option value="bug">bug</option>
        </select>
        <input type="text" name="title" placeholder="add a task" value={task.title} onChange={(e) => handleChange(e)}/>
        <Button onClick={e => addTask(e)} title={<FontAwesomeIcon style={{color: '#f7f7f7', fontSize: '20px' }} icon={faPlus} />}></Button>
      </form>
      <FlashMessage thestyle="flashmessage" show={flash} message={message} />
    </div>
  )

}

export default AddTask
