import React, { Component } from 'react'

export default class TeamMemberInvite extends Component {
  constructor(props) {
    super(props)
  }

  sendInvite = e => {
    e.preventDefault();
  }

  render() {
    if (this.props.show) {
      return (
        <div>
          <form>
            <label>Email</label>
            <input type="email" placeholder="members email"/>
            <input type="submit" value="send invite" onClick={e => this.sendInvite(e)}/>
          </form>
        </div>
      )
    }
    else {
      return null
    }
  }
}
