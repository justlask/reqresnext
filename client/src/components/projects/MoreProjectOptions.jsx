import React, { Component } from 'react'
import Button from '../Button'

export default class MoreProjectOptions extends Component {
  constructor(props) {
    super(props)
  }


  handleComplete = () => {
    if (this.props.project.complete) {
      return (
        <Button className="noButtonEdit" onClick={e => this.props.markIncomplete()} title="Mark As Incomplete"></Button>
      )
    }
    else {
      return (
        <Button className="noButtonEdit" onClick={e => this.props.markComplete()} title="Mark As Complete"></Button>
      )
    }
  }

  render() {

    if(!this.props.show) {
      return null;
    }
    
    return (
      <div className="editme">
        <Button className="noButtonEdit" title="Edit this project" onClick={e => this.props.toggleEdit(e)}></Button>
        {this.handleComplete()}
        <Button className="noButtonEdit" title="Delete this project" onClick={e => this.props.deleteProject(e)}></Button>
      </div>
    )
  }
}
