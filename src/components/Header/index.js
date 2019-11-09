import React, { Component } from 'react'
import './style.css';

export default class Header extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">Memory Palace</h1>
        <p className="lead"></p>
        <p className="info-field" id="sub-title">Exercise the Medial Parietal Cortex</p>
      </div>
    )
  }
}
