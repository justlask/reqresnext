import React, { Component } from 'react'

export default class TaskComment extends Component {
  render() {
    return (
      <div className="taskcomment">
        <p>{this.props.comment.description}</p>
        <sub>{this.props.comment.owner.name}</sub>
      </div>
    )
  }
}
