import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div id="hero">
      <div id="herotext">
        <h1>Project management<br></br> for the rest of us.</h1>
        <p>
        Ever get tired of endless post-its, task cards<br></br> that seem to pile on top of each other?<br></br>
        <br></br>Us too. That’s why we made this.
        </p>
        <Link to="/signup" className="mainblue">c'mon, it's free!</Link>
      </div>
      <img src="./MessyDoodle.svg" alt="c/o palblo stanley"/>
    </div>
  )
}

export default Hero