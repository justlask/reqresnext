import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <section>
        <div id="about">
        <div className="abouttext">
          <h1>Are you the design,<br></br> dev, and QA team?</h1>
          <p>We've all been there.<br></br>Let's make the process a bit nicer, shall we?<br></br>Introducing Req, Res, Next.</p>
        </div>
        <div className="boxes">
          <div>
            <h3>req</h3>
            <p>Start with the user request, what actions will the user be doing.</p>
          </div>
          <div>
            <h3>res</h3>
            <p>Respond with the tasks needed to achieve the functionality.</p>
          </div>
          <div>
            <h3>next</h3>
            <p>Knock those tasks off and move on to the next.</p>
          </div>
        </div>
      </div>
      </section>
    )
  }
}
