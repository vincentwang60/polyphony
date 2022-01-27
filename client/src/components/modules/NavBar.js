import React, { Component } from "react";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-container u-flexColumn">
      <div className="u-flex">
        <div className="NavBar-text">No time for a good tutorial, but create and select tracks on the sidebar. Drag the edges of the track to move them, or the track itself. Click notes on the note picker to add to the track</div>
      </div>
      <div className="NavBar-bottomLine"></div>
    </nav>
  );
};

export default NavBar;
