import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div id="name">
          <p>( req, res, next )</p>
          <p style={{fontSize: '12px', fontWeight: 'normal'}}>&copy; 2020 ReqResNext.com</p>
        </div>
        <div className="footerlinks">
          <h4>Lauren Laskerr</h4>
          <h5>Developer</h5>
          <a href="http://www.justlask.com" target="_blank">justlask.com</a>
          <a href="https://www.github.com/justlask" target="_blank">github.com/justlask</a><br></br>
        </div>
        <div className="footerlinks">
          <h4>About Req, Res, Next</h4>
          <Link to="/about" target="_blank">About</Link>
          <Link to="/blog" target="_blank">Blog</Link>
          <Link to="/contact" target="_blank">Contact</Link>
        </div>
      </footer>
    )
  }
}
