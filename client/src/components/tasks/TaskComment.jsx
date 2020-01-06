import React, { Component } from 'react'

export default class TaskComment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="taskcomment">
        <img src={this.props.comment.owner.image} alt=""/>
        <div>
          <sub>{this.props.comment.owner.name}</sub>
          <p>{this.props.comment.description}</p>
        </div>
      </div>
    )
  }
}
