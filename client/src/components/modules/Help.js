import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./Help.css";

const Help = (props) => {
  const text = [
    "Click 'Add Track' on the left Sidebar and you'll see a new track appear on the sidebar. You'll also see the colored track viewer appear on the main board. You can create up to 4 tracks.",
    "Drag a track to move it around the board. Change the start or end times by dragging the gray handles on the ends of the track. (Soon: You can rename a track by click on it in the sidebar. Change colors by entering a hex code into the input. Delete by clicking the trash icon)",
    "Click a track on the Sidebar or the board to select it, and the note picker will appear. Add notes by clicking squares on the note picker within the range of the track (soon indicated by the highlighted lines). You'll see the square become highlighted, and the note will appear on the selected track as a horizontal line. Scroll up or down on the note picker to see more pitches. C0 is the lowest pitch octave, and C7 is the highest pitch octave.",
    "Songs are automatically saved to your Google account. Sharing is a WIP, check back soon!",
  ];
  const [current, setCurrent] = useState(0);
  const [highlight, setHighlight] = useState(1.5);
  const [highlightDest, setHighlightDest] = useState(35);
  const [move, setMove] = useState(false)

  useEffect(() => {
    if (move) {
      if (highlight < highlightDest) {
        const i = setInterval(() => {
          setHighlight((oldHighlight) => oldHighlight + 0.5);
        }, 1);
        return () => {
          clearInterval(i);
        };
      } else {
        const i = setInterval(() => {
          setHighlight((oldHighlight) => oldHighlight - 0.5);
        }, 1);
        return () => {
          clearInterval(i);
        };
      }
    }
  }, [move]);
  useEffect(() => {
    if (Math.abs(highlight - highlightDest) < 2) {
      setHighlight(highlightDest);
      setMove(false)
    }
  }, [highlight]);

  if (props.show) {
    return (
      <>
        <div className="help-all u-flex">
          <div className="help-container">
            <div className="help-top">How do I...</div>
            <div className="help-line" />
            <div className="help-tabsContainer u-flex">
              <div
                onClick={() => {
                  setCurrent(0);
                  setHighlightDest(1.5);
                  setMove(true)
                }}
                className="help-tab"
              >
                Add tracks?
              </div>
              <div
                onClick={() => {
                  setCurrent(1);
                  setHighlightDest(13);
                  setMove(true)
                }}
                className="help-tab"
              >
                Customize or delete tracks?
              </div>
              <div
                onClick={() => {
                  setCurrent(2);
                  setHighlightDest(25.5)
                  setMove(true)
                }}
                className="help-tab"
              >
                Add notes?
              </div>
              <div
                onClick={() => {
                  setCurrent(3);
                  setHighlightDest(33)
                  setMove(true)
                }}
                className="help-tab"
              >
                Share or save my song?
              </div>
            </div>
            <div className="help-line" style={{ marginTop: "0vh" }} />
            <div className="help-highlight" style={{ marginLeft: highlight.toString() + "vw" }} />
            <div className="help-body">{text[current]}</div>
          </div>
          <AiOutlineClose
            onClick={() => {
              props.setShowHelp(false);
            }}
            size="1.5vw"
            className="help-x"
          />
        </div>
      </>
    );
  }
  return <></>;
};

export default Help;
