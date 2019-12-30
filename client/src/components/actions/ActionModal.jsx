import React, { Component } from 'react'
import AuthService from '../auth/AuthService'
import Button from '../Button'

// the modal that opens to allow people to add an action

export default class ActionModal extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {}
  }

  componentDidMount(){

  }



  handleAction = () => {
    console.log(this.props.projectID)
  }

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          <h3></h3>
        {this.handleAction()}

          FUCK.


          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, minima est neque ipsa quis distinctio consequuntur. Qui quia numquam illo molestias animi eius a placeat natus. Ex quam eveniet quibusdam.
          <div className="addactionmodal">
            <Button title="create" onClick={this.props.onClose}></Button>
          </div>
        </div>
      </div>
    );
  }
}
