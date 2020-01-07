import React, { Component } from 'react'
import Button from '../Button'

export default class MoreActionOptions extends Component {
  constructor(props) {
    super(props)
  }


  handleComplete = () => {
    if (this.props.action.complete) {
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
        <Button className="noButtonEdit" title="Edit this action" onClick={e => this.props.toggleModal(e)}></Button>
        {this.handleComplete()}
        <Button className="noButtonEdit" title="Delete this action" onClick={e => this.props.deleteAction(e)}></Button>
      </div>
    )
  }
}
