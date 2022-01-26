import React, { useState, useEffect } from "react";

import "./Player.css";
import NotePicker from "./NotePicker.js";
import TopBar from "./TopBar.js";
import Board from "./Board.js";

const Player = (props) => {
  return (
    <>
      <div className="player-container u-flex">
        <div className="player-leftLine" />
        <div className="player-containerH u-flexColumn">
          <TopBar />
          <Board showPicker={props.showPicker} songId={props.song._id} />
          <NotePicker
            user={props.user}
            song={props.song}
            selected={props.selected}
            showPicker={props.showPicker}
            setShowPicker={props.setShowPicker}
          />
        </div>
      </div>
    </>
  );
};

export default Player;
