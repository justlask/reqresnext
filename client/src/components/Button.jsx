import React, { Component } from 'react'

export default class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <button className={this.props.style} onClick={this.props.onClick}>{this.props.title}</button>
      </div>
    )
  }
}
