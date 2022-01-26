import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

import "./NewTrack.css";

const NewTrack = (props) => {
  const handleClick = () => {
    console.log('new track pressed', props)
    {props.addNewTrack()}
    {props.setShowPicker(true)}
  }
  return (
    <>
      <div className="newtrack-container u-flexColumn" onClick={handleClick}>
        <AiOutlinePlusCircle color="var(--lightgrey)" size="25%" />
        <div className="newtrack-text">Add Track</div>
      </div>
      <div className="newtrack-line"></div>
    </>
  );
};

export default NewTrack;
