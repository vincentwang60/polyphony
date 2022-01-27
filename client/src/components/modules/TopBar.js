import React, { Component, useState } from "react";

import "./TopBar.css";
import { AiFillPlayCircle, AiOutlineBackward, AiOutlineForward } from "react-icons/ai";
import timeline from "../../public/timeline.png";
import player from "../../public/player.png";

const TopBar = (props) => {
  const onMouseDown = (e) => {
    props.setPlayerTime(1.25 * Math.round((4 / 5) * ((e.clientX * 100) / window.innerWidth) - 16))
    props.setPlaying([])
  }
  return (
    <>
      <div className="topbar-container u-flexColumn">
        <div className="topbar-playerContainer u-flex">
          <img src={player} className="topbar-player" style={{ left: props.playerTime + "vw" }} />
          <div className="topbar-buttonContainer u-flex">
            <AiOutlineBackward onClick={()=>{props.setPlayerTime(0)}} size="5vh" color="white" />
            <AiFillPlayCircle
              onClick={() => {
                props.setPlay(!props.play)
              }}
              size="5vh"
              color="#7C68CF"
            />

            <AiOutlineForward onClick={()=>{props.setPlayerTime(64*1.25)}}size="5vh" color="white" />
          </div>
        </div>
        <div className="topbar-timelineContainer u-flex">
          <img onClick={onMouseDown} src={timeline} className="topbar-timeline" />
        </div>
        <div className="topbar-line"></div>
      </div>
    </>
  );
};

export default TopBar;
