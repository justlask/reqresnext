import React, { Component } from 'react'
import Button from '../Button'

export default class MoreUserOptions extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    if(!this.props.show) {
      return null;
    }
    
    return (
      <div className="editaccountbtns">
        <Button className="noButtonEdit" title="Edit Account" onClick={e => this.props.toggleEdit(e)}></Button>
        <Button className="noButtonEdit" title="Delete Account" onClick={e => this.props.deleteAccount(e)}></Button>
      </div>
    )
  }
}
