import React, { Component } from 'react'
import Navbar from '../../Navbar'
import Hero from '../home/Hero'

export default class Home extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <main>
        <Navbar />
        <Hero />
      </main>
    )
  }
}
