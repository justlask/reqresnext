import React, { Component } from 'react'
import Hero from '../home/Hero'
import About from '../home/About'
import Mockups from '../home/Mockups'

export default class Home extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <main>
        <Hero />
        <About />
        <Mockups />
      </main>
    )
  }
}
