import React, { useState, useEffect } from "react";

import "./NotePicker.css";
import "../../utilities.css";
import Keyboard from "../../public/keyboard.png";
import { get, post } from "../../utilities.js";

const NotePicker = (props) => {
  const [track, setTrack] = useState(undefined);

  let keyboardMap = [];
  let gridMap = [];
  for (let i = -2; i < 9; i++) {
    keyboardMap.push(i);
  }
  for (let i = 0; i < 64; i++) {
    gridMap.push(i);
  }
  let gridMapHorizontal = [
    [0, true],
    [1, false],
    [2, true],
    [3, false],
    [4, true],
    [5, true],
    [6, false],
    [7, true],
    [8, false],
    [9, true],
    [10, false],
    [11, true],
  ];

  const handleClick = (i, j, k) => {
    let time = k;
    let note = 107 - 12 * i - j[0];
    console.log("time", time, "note", note);
    const body = {
      _id:props.song._id,
      trackId: props.selected,
      notes: [time, note],
    };
    post("api/updatetrack", body).then((updatedSong) => {
      console.log("updated to", updatedSong);
      get("/api/track", { _id: props.song._id, trackId: props.selected }).then((track) => {
        console.log("got updated track", track);
        setTrack(track[0]);
      });
    });
  };

  useEffect(() => {
    if (props.selected != undefined && props.selected != -1) {
      console.log("notepicker getting with", props.song._id, props.selected);
      get("/api/track", { _id: props.song._id, trackId: props.selected }).then((track) => {
        console.log("got track", track);
        setTrack(track[0]);
      });
    }
  }, [props.selected]);

  const inTrack = (i, j, k) => {
    let time = k;
    let note = 107 - 12 * i - j[0];
    for (let n = 0; n < track.notes.length; n++) {
      if (track.notes[n][0] == time && track.notes[n][1] == note) {
        return true;
      }
    }
    return false;
  };

  if (props.showPicker && track != undefined) {
    return (
      <>
        <div className="notepicker-temp">Note picker for {props.selected}</div>
        <div className={"notepicker-container" + (props.showPicker ? "" : "-hidden")}>
          <div className="notepicker-main u-flex">
            <div className={"notepicker-keyboard-container u-flexColumn"}>
              {keyboardMap.map((i) => {
                return (
                  <div className="u-flex">
                    <div className={"notepicker-octaveContainer u-flex"}>
                      <img className={"notepicker-keyboard"} src={Keyboard} />
                      <div className={"notepicker-label"}>C{6 - i}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="notepicker-gridContainer">
              {keyboardMap.map((i) => {
                return (
                  <div className="notepicker-gridRowContainer">
                    {gridMapHorizontal.map((j) => {
                      return (
                        <div>
                          <div
                            className={"notepicker-gridRow" + (j[1] ? "" : "-black") + " u-flex"}
                          >
                            {gridMap.map((k) => {
                              return (
                                <div>
                                  <div
                                    className={"notepicker-gridCol" + (j[1] ? "" : "-black") + (inTrack(i,j,k) ? "-special":"")}
                                    onClick={() => {
                                      handleClick(i, j, k);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="notepicker-lineH" />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
  return <></>;
};

export default NotePicker;
