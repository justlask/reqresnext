import React, { Component } from 'react'
import Button from '../Button'

export default class Hero extends Component {
  render() {
    return (
      <div id="hero">
        <div id="herotext">
          <h1>Project management<br></br> for the rest of us.</h1>
          <p>
          Ever get tired of endless post-its, task cards<br></br> that seem to pile on top of each other?<br></br>
          <br></br>Us too. That’s why we made this.
          </p>
          <Button style="mainblue" title="c'mon it's free"/>
        </div>
        <img src="./MessyDoodle.svg" alt="c/o palblo stanley"/>
      </div>
    )
  }
}
