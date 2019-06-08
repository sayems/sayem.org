import React, { Component } from 'react'
import { Link } from 'gatsby'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <a href="https://twitter.com/sayems" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://github.com/sayems" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.sayem.org/rss.xml" target="_blank" rel="noopener noreferrer">
          RSS
        </a>
        <a
          href="https://github.com/sayems/sayem.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source
        </a>
      </footer>
    )
  }
}
