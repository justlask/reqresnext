import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <div id="about">
        <div className="abouttext">
          <h1>Are you the design team,<br></br> dev team and QA team?</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br></br> Est corrupti quasi illo laborum sint.<br></br> Facilis quod officia fugiat?</p>
        </div>
        <div className="boxes">
          <div>
            <h3>req</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, nulla.</p>
          </div>
          <div>
            <h3>res</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, temporibus.</p>
          </div>
          <div>
            <h3>next</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, obcaecati.</p>
          </div>
        </div>
      </div>
    )
  }
}
