import React, { Component } from "react";

import "./TopBar.css";
import { AiFillPlayCircle, AiOutlineBackward, AiOutlineForward } from "react-icons/ai";
import timeline from "../../public/timeline.png"

const TopBar = (props) => {
  const rulerMap = [1,2,3,4,5,6,7,8]
  return (
    <>
      <div className="topbar-container u-flexColumn">
        <div className="topbar-playerContainer">
          <div className="topbar-buttonContainer u-flex">
            <AiOutlineBackward size="5vh" color="white" />
            <AiFillPlayCircle size="5vh" color="#7C68CF" />
            <AiOutlineForward size="5vh" color="white" />
          </div>
        </div>
        <div className="topbar-timelineContainer u-flex">
          <img src={timeline} className="topbar-timeline"/>
        </div>
        <div className="topbar-line"></div>
      </div>
    </>
  );
};

export default TopBar;