import React, { useState, useEffect } from "react";

import "./NotePicker.css";
import "../../utilities.css";
import Keyboard from "../../public/keyboard.png";
import { get, post } from "../../utilities.js";

const NotePicker = (props) => {
  const [track, setTrack] = useState(undefined);

  let keyboardMap = [];
  let gridMap = [];
  for (let i = 0; i < 7; i++) {
    keyboardMap.push(i);
  }
  for (let i = 0; i < 64; i++) {
    gridMap.push(i);
  }
  let gridMapHorizontal = [
    [0, false],
    [1, true],
    [2, false],
    [3, true],
    [4, true],
    [5, false],
    [6, true],
    [7, false],
    [8, true],
    [9, true],
    [10, false],
    [11, true],
  ];

  const getTrack = (trackId) => {
    for (let i=0; i < props.song.tracks.length; i++){
      if (props.song.tracks[i]._id.toString() == trackId){
        return props.song.tracks[i]
      }
    }
    return -1
  }

  const handleClick = (i, j, k) => {
    let time = k;
    let note = 83 - 12 * i - j[0];
    const body = {
      _id:props.song._id,
      trackId: props.selected,
      notes: [time-track.start, note],
    };
    post("api/updatetrack", body).then((res) => {
      setTrack(res)
    });
    props.notePicked(note)
  };

  useEffect(() => {
    if (props.selected != undefined && props.selected != -1) {
      setTrack(getTrack(props.selected))
    }
  }, [props.selected]);

  useEffect(() => {
    setTrack(getTrack(props.selected))
  },[props.song])

  const inTrack = (i, j, k) => {
    let time = k;
    let note = 83 - 12 * i - j[0];
    for (let n = 0; n < track.notes.length; n++) {
      if (track.notes[n][0]+track.start == time && track.notes[n][1] == note) {
        return true;
      }
    }
    return false;
  };

  if (props.showPicker && track != undefined && track != -1) {
    return (
      <>
        <div className={"notepicker-container" + (props.showPicker ? "" : "-hidden")}>
          <div className="notepicker-main u-flex">
            <div className={"notepicker-keyboard-container u-flexColumn"}>
              {keyboardMap.map((i) => {
                return (
                  <div className="u-flex">
                    <div className={"notepicker-octaveContainer u-flex"}>
                      <img className={"notepicker-keyboard"} src={Keyboard} />
                      <div className={"notepicker-label"}>C{7 - i}</div>
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
            <div onClick={()=>{props.setShowPicker(false)}} className="notepicker-close">X</div>
          </div>
        </div>
      </>
    );
  }
  else{
  }
  return <></>;
};

export default React.memo(NotePicker);
