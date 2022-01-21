import React, { Component } from "react";

import "./NavBar.css";
import logo from "../../public/logo.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container u-flex">
        <div className="NavBar-bottomLine u-flex"></div>
      </nav>
    );
  }
}

export default NavBar;