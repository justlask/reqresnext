import React, { Component } from 'react'
import AuthService from './auth/AuthService';

export default class ProjectModal extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService;
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="backdrop" style={{backdropStyle}}>
        <div className="modal" style={{modalStyle}}>
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
