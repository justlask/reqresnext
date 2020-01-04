import React, { Component } from 'react'
import AuthService from '../auth/AuthService'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {

    }
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({
      user: this.props.user
    })
  }

  render() {
    return (
      <main className="accountpage">
        <div className="userInfo">
          <img src={this.props.user.image} alt="user"/>
          <h1>{this.props.user.name}</h1>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora itaque eos omnis quis nobis dicta quas ex porro illo aut eaque mollitia consectetur voluptatem, laborum necessitatibus aspernatur aliquid ducimus nihil.</p>
        </div>
      </main>
    )
  }
}
