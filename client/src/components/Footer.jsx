import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div id="name">
          <p>( req, res, next )</p>
        </div>
        <div className="footerlinks">
          <h4>About The Developer</h4>
          <a href="http://www.justlask.com">justlask.com</a>
          <a href="https://www.github.com/justlask">github</a>
        </div>
        <div className="footerlinks">
          <h4>About Req, Res, Next</h4>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
        </div>
      </footer>
    )
  }
}
