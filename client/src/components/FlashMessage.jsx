import React, { Component } from 'react'

export default class FlashMessage extends Component {
  constructor(props) {
    super(props)
  }

  loadMessage = () => {
    if (this.props.show) {
      return (
        <div className="flashmessage">
          <p>{this.props.message}</p>
        </div>
      )
    }
    else {
      return null
    }
  }

  
  render() {
    return this.loadMessage()
  }
}
