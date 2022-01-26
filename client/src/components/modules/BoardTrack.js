import React, { Component } from "react";

import "./BoardTrack.css";

const BoardTrack = (props) => {
  return (
    <>
      <div className="boardtrack-container">
        <div className="boardtrack-title-container">
          <div className="boardtrack-text">Board Track</div>
          <div className="boardtrack-text">Board Track</div>
        </div>
      </div>
      <div className="boardtrack-line"></div>
    </>
  );
};

export default BoardTrack;
