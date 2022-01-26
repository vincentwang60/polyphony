import React, { Component } from "react";

import "./Track.css";

const Track = (props) => {
  return (
    <>
      <div
        className={"track-" + (props.highlight ? "selected" : "container")}
        onClick={() => {
          props.setShowPicker(true)
          props.clickFunction(props.id);
        }}
      >
        <div className="track-title-container">
          <div className="track-text">{props.name}</div>
          <div className="track-text">{props.type}</div>
        </div>
      </div>
        <div className = "track-line"></div>
    </>
  );
};

export default Track;
