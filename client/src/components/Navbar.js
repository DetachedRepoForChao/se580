import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// Navbar component
class Navbar extends Component {
  // Navbar state
  state = {

  }

  // when the componenet mounts to the DOM
  componentDidMount(){

  }

  // render method for Navbar
  render () {
    return (
      <nav className="nav-wrapper blue darken-4">
        <NavLink className="brand-logo" to="/">CS 580</NavLink>
      </nav>
    )
  }

}

export default Navbar;

