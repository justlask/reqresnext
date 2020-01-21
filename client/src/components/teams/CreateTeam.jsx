import React, { Component } from 'react'

export default class CreateTeam extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  submitNewTeam = (e) =>{
    e.preventDefault();
    console.log(this.state)
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  render() {
    if (this.props.show) {
      return (
        <div className="createform">
          <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <label>Team Name</label>
            <input type="text" name="name" placeholder="team name" onChange={e => this.handleChange(e)}/>
            <input type="submit" onClick={e => this.submitNewTeam(e)}/>
          </form>
        </div>
      )
    }
    else {
      return (
        <div><p>nothing here</p></div>
      )
    }
  }
}
