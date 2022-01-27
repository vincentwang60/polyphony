import React, { useState, useEffect } from "react";

import "./Board.css";
import BoardTrack from "./BoardTrack.js";

const Board = (props) => {
  return (
    <>
      <div className={"board-container" + (props.showPicker ? "" : "-full u-flexColumn")}>
        {props.song.tracks.map((track) => {
          return (
            <>
              <div className="board-track">
                <BoardTrack
                  setSelected={props.setSelected}
                  setSong={props.setSong}
                  setShowPicker={props.setShowPicker}
                  color={"#" + track.color}
                  song={props.song}
                  track={track}
                />
              </div>
              <div className="board-line"></div>
            </>
          );
        })}
      </div>
    </>
  );
};
//
export default Board;
