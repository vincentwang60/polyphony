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
        <div className="track-title-container u-flex">
          <div className="track-text u-flex">{props.name} {props.num}</div>
        </div>
      </div>
        <div className = "track-line"></div>
    </>
  );
};

export default Track;
