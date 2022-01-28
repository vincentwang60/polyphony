import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

import "./NewTrack.css";

const NewTrack = (props) => {
  const handleClick = () => {
    {props.addNewTrack()}
    {props.setShowPicker(true)}
  }
  if (props.num < 4){
  return (
    <>
      <div className="newtrack-container u-flexColumn" onClick={handleClick}>
        <AiOutlinePlusCircle color="var(--lightgrey)" size="25%" />
        <div className="newtrack-text">Add Track</div>
      </div>
      <div className="newtrack-line"></div>
    </>
  );
  }
  return (<></>)
};

export default NewTrack;
