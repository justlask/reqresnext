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
          <h4>Developer</h4>
          <a href="http://www.justlask.com" target="_blank">justlask.com</a>
          <a href="https://www.github.com/justlask" target="_blank">github.com/justlask</a><br></br>
          <h4>Design Consultant</h4>
          <a href="http://www.nicolematos.design" target="_blank">NicoleMatos.design</a>
        </div>
        <div className="footerlinks">
          <h4>About Req, Res, Next</h4>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    )
  }
}
