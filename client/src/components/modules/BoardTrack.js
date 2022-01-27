import React, { useState, useEffect } from "react";
import { post } from "../../utilities.js";

import "./BoardTrack.css";

const BoardTrack = (props) => {
  const [left, setLeft] = useState(1.25 * props.track.start + "vw");
  const [right, setRight] = useState(1.25 * props.track.end + "vw");
  const [length, setLength] = useState(
    1.25 * (props.track.end - props.track.start).toString() + "vw"
  );
  const [dragLeft, setDragLeft] = useState(false);
  const [dragRight, setDragRight] = useState(false);
  const [dragMain, setDragMain] = useState(false);

  const timeFromString = (input) => {
    return (parseFloat(input.substring(0, input.length - 2)) * 4) / 5;
  };

  let gridMap = [];
  for (let i = 0; i < props.track.end - props.track.start; i++) {
    gridMap.push(i);
  }
  let gridMapH = [];
  for (let i = 83; i >= 0; i--) {
    gridMapH.push(i);
  }

  const inTrack = (time, note) => {
    time = time + props.track.start;
    for (let n = 0; n < props.track.notes.length; n++) {
      if (props.track.notes[n][0]+props.track.start == time && props.track.notes[n][1] == note) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <div
        onMouseUp={(e) => {
          let body = {
            _id: props.song._id,
            trackId: props.track._id,
          };
          if (dragLeft) {
            setDragLeft(false);
            body.start = timeFromString(left);
          }
          if (dragRight) {
            setDragRight(false);
            body.end = timeFromString(right);
          }
          if (dragMain) {
            setDragMain(false);
            body.start = timeFromString(left);
            body.end = timeFromString(left)+timeFromString(length);
          }
          post("api/updatetrack", body).then((res) => {
          });
        }}
        onMouseMove={(e) => {
          if (dragLeft) {
            let newLeft = 1.25 * Math.round((4 / 5) * ((e.clientX * 100) / window.innerWidth) - 16);
            setLeft(newLeft.toString() + "vw");
            setLength((parseInt(right.substring(0, 2)) - newLeft).toString() + "vw");
          }
          if (dragRight) {
            let newRight =
              1.25 * Math.round((4 / 5) * ((e.clientX * 100) / window.innerWidth) - 16);
            console.log("newRight", newRight);
            setRight(newRight.toString() + "vw");
            setLength(parseInt(newRight - left.substring(0, 2)).toString() + "vw");
          }
          if (dragMain) {
            let newLeft = 1.25 * Math.round((4 / 5) * ((e.clientX * 100) / window.innerWidth) - 16)-1.25*Math.round((4/5)*5/8*timeFromString(length));
            setLeft(newLeft.toString() + "vw");
          }
        }}
        className="boardtrack-container"
      >
        <div style={{ width: length, left: left, position: "absolute" }}>
          <div
            onMouseDown={(e) => {
              setDragLeft(true);
            }}
            style={{
              height: "11.35vh",
              width: "0.8vw",
              backgroundColor: "#FFFFFF",
              left: 0,
              position: "absolute",
              backgroundColor: "#464152",
            }}
          />
          <div
            onMouseDown={(e) => {
              setDragRight(true);
            }}
            style={{
              height: "11.35vh",
              width: "0.8vw",
              backgroundColor: "#FFFFFF",
              left: length,
              position: "absolute",
              marginLeft: "-0.8vw",
              backgroundColor: "#464152",
            }}
          />
          <div style={{ backgroundColor: props.track.color, opacity: 1 }}>
            <div
              onMouseDown={(e) => {
                setDragMain(true);
                props.setSelected(props.track._id)
                props.setShowPicker(true)
              }}
              className="boardtrack-boxContainer u-flex"
            >
              {gridMap.map((i) => {
                return (
                  <div className="boardtrack-rowContainer">
                    {gridMapH.map((j) => {
                      return (
                        <div className={"boardtrack-note" + (inTrack(i, j) ? "-special" : "")} />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardTrack;
