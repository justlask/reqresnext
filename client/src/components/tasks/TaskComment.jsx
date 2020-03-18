import React from 'react'

const TaskComment = (props) => {
  console.log(props)
  return (
    <div className="taskcomment">
      <img src={props.comment.owner.image} alt=""/>
      <div>
        <sub>{props.comment.owner.name}</sub>
        <p>{props.comment.description}</p>
      </div>
    </div>
  )
}

export default TaskComment
